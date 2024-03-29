import { Component } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FirebaseError } from '@angular/fire/app/firebase';
import { readUser } from "../../../../../shared/interfaces/user";
import { nav_path } from 'src/app/app-routing.module';
import { FirestoreService } from "../../../../../shared/services/firestore.service";
import { FunctionsService } from "../../../../../shared/services/functions.service";
import { ConsoleLoggerService } from "../../../../../core/services/console-logger.service";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "../../../../../shared/components/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'aj-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent {
  public readonly title = 'Users';
  public readonly nav_path = nav_path;
  public users$?: Observable<readUser[]>;
  public error?: FirebaseError;

  constructor(
    private db: FirestoreService,
    private fn: FunctionsService,
    private cLog: ConsoleLoggerService,
    private dialog: MatDialog,
  ) {
    this.users$ = (this.db.col$(`users`, { idField: 'id' }) as Observable<readUser[]>)
      .pipe(catchError((error: FirebaseError) => {
        console.error(`Something went wrong loading users`, error.message)
        this.error = error;
        return throwError(error);
      }))
  }

  public async updateUser(user?: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      id: 'confirm-update-user-dialog',
      data: {
        title: `Update user?`,
        description: `Are you sure you want to update ${user}?`,
      }
    });

    await dialogRef.afterClosed().forEach(async confirm => {
      if (!confirm) return;

      await this.fn.httpsCallable<{success: boolean, message: string}>
      (`admin-updateUser`, {user: user})
        .then(result => this.cLog.log(result.message))
        .catch(error => this.cLog.error(error.message, error));
    });
  }
}
