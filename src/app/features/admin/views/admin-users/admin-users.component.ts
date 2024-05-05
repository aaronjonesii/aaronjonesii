import { Component } from '@angular/core';
import { first, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FirebaseError } from '@angular/fire/app/firebase';
import { MatDialog } from '@angular/material/dialog';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import {
  TopAppBarComponent,
} from '../../../../shared/components/top-app-bar/top-app-bar.component';
import {
  UserPhotoComponent,
} from '../../../../shared/components/user-photo/user-photo.component';
// eslint-disable-next-line max-len
import { LoadingOrErrorComponent } from '../../../../shared/components/loading-or-error/loading-or-error.component';
import { readUser } from '../../../../shared/interfaces/user';
import {
  FirestoreService,
} from '../../../../shared/services/firestore.service';
import {
  FunctionsService,
} from '../../../../shared/services/functions.service';
import {
  ConfirmDialogComponent,
  ConfirmDialogContract,
} from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { navPath } from '../../../../app.routes';
import {
  ConsoleLoggerService,
} from '../../../../shared/services/console-logger.service';
import {
  AdminUpdateUserRequest,
  AdminUpdateUserResponse,
} from '../../../../shared/interfaces/functions';
import { FunctionsError } from '@angular/fire/functions';
import {
  TopAppBarService,
} from '../../../../shared/components/top-app-bar/top-app-bar.service';

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
  readonly title = 'Users';
  readonly nav_path = navPath;
  users$?: Observable<readUser[]>;
  error?: FirebaseError;

  constructor(
    private dialog: MatDialog,
    private db: FirestoreService,
    private fn: FunctionsService,
    private logger: ConsoleLoggerService,
    private topAppBarService: TopAppBarService,
  ) {
    this.topAppBarService.setOptions({
      title: `Admin ${this.title}`,
      loading: false,
      showBackBtn: true,
    });

    this.users$ = this.db.col$<readUser>(`users`, { idField: 'id' })
      .pipe(catchError((error: FirebaseError) => {
        this.logger.error(`Something went wrong loading users`, error.message);
        this.error = error;
        return of([]);
      }));
  }

  async updateUser(userId?: string) {
    const confirmDialogContract: ConfirmDialogContract = {
      title: `Update user?`,
      description: `Are you sure you want to update ${userId}?`,
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      id: 'confirm-update-user-dialog',
      data: confirmDialogContract,
    });

    await dialogRef.afterClosed().pipe(first()).forEach(async (confirm) => {
      if (!confirm) return;

      await this.fn.httpsCallable<
        AdminUpdateUserRequest, AdminUpdateUserResponse
      >(`admin-updateUser`, { user: userId })
        .then((result) => this.logger.log(result.message))
        .catch((error: FunctionsError) => {
          this.logger.error(error.message, error);
        });
    });
  }
}
