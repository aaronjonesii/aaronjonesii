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
import { TopAppBarComponent } from "../../../../../shared/components/top-app-bar/top-app-bar.component";
import { AsyncPipe, DatePipe } from "@angular/common";
import { MatListModule } from "@angular/material/list";
import { UserPhotoComponent } from "../../../../../shared/components/user-photo/user-photo.component";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";
import { LoadingOrErrorComponent } from "../../../../../shared/components/loading-or-error/loading-or-error.component";

@Component({
  selector: 'aj-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.scss',
  standalone: true,
  imports: [
    TopAppBarComponent,
    AsyncPipe,
    MatListModule,
    UserPhotoComponent,
    DatePipe,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    MatButtonModule,
    RouterLink,
    LoadingOrErrorComponent,
  ],
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
