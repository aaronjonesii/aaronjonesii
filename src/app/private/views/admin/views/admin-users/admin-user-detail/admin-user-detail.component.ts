import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { MatDialog } from "@angular/material/dialog";
import { nav_path } from 'src/app/app-routing.module';
import { readUser } from "../../../../../../shared/interfaces/user";
import { FirestoreService } from "../../../../../../shared/services/firestore.service";
import { ConsoleLoggerService } from "../../../../../../core/services/console-logger.service";
import { FunctionsService } from "../../../../../../shared/services/functions.service";
import { ConfirmDialogComponent } from "../../../../../../shared/components/confirm-dialog/confirm-dialog.component";
import { TopAppBarComponent } from "../../../../../../shared/components/top-app-bar/top-app-bar.component";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { AsyncPipe, DatePipe } from "@angular/common";
import {
  LoadingOrErrorComponent
} from "../../../../../../shared/components/loading-or-error/loading-or-error.component";

@Component({
  selector: 'aj-admin-user-detail',
  templateUrl: './admin-user-detail.component.html',
  styleUrl: './admin-user-detail.component.scss',
  standalone: true,
  imports: [
    TopAppBarComponent,
    AsyncPipe,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    DatePipe,
    LoadingOrErrorComponent,
  ],
})
export class AdminUserDetailComponent {
  public readonly title = 'User detail';
  public readonly nav_path = nav_path;
  public user$: Observable<readUser>;
  public error?: Error;

  constructor(
    private route: ActivatedRoute,
    private db: FirestoreService,
    private cLog: ConsoleLoggerService,
    private dialog: MatDialog,
    private fn: FunctionsService
  ) {
    const uid = route.snapshot.paramMap.get('userUID');

    this.user$ = (db.doc$(`users/${uid}`) as Observable<readUser>)
      .pipe(
        map(user => ({...user,id:uid}) as readUser),
        catchError(error => {
          this.error = error;
          cLog.error(`Something went wrong loading user from db`, uid, error);
          return throwError(error);
        })
      );
  }

  public updateAdminRole(user: readUser) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `${user.admin == true ? 'Revoke' : 'Grant'} admin?`,
        description: `${user.displayName ?? user.email} will ${user.admin == true ? 'no longer be an admin on their next successful login.' : 'be an admin on their next successful login.'}`
      }
    });

    dialogRef.afterClosed().forEach(confirm => {
      if (confirm) {
        this.fn.httpsCallable('admin-updateClaims', {user: user.id, admin: user.admin != true})
          .then(() => {
            this.cLog.log(`Updated admin role for ${user.displayName ?? user.email}, changes will take effect on next successful login.`);
          }).catch(error => {
            this.cLog.error(`Something went wrong updating admin role for ${user.displayName ?? user.email}`, error);
        });
      }
    });
  }
}
