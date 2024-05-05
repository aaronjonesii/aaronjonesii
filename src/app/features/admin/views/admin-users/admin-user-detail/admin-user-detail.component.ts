import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { first, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe, DatePipe, NgOptimizedImage } from '@angular/common';
import {
  TopAppBarComponent,
} from '../../../../../shared/components/top-app-bar/top-app-bar.component';
import {
  LoadingOrErrorComponent,
// eslint-disable-next-line max-len
} from '../../../../../shared/components/loading-or-error/loading-or-error.component';
import {
  UserPhotoComponent,
} from '../../../../../shared/components/user-photo/user-photo.component';
import { readUser } from '../../../../../shared/interfaces/user';
import {
  FirestoreService,
} from '../../../../../shared/services/firestore.service';
import {
  FunctionsService,
} from '../../../../../shared/services/functions.service';
import {
  ConfirmDialogComponent,
  ConfirmDialogContract,
// eslint-disable-next-line max-len
} from '../../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { navPath } from '../../../../../app.routes';
import {
  ConsoleLoggerService,
} from '../../../../../shared/services/console-logger.service';
import { FirebaseError } from '@angular/fire/app/firebase';
import { FunctionsError } from '@angular/fire/functions';
import {
  AdminUpdateClaimsRequest, AdminUpdateClaimsResponse,
} from '../../../../../shared/interfaces/functions';
import {
  TopAppBarService
} from "../../../../../shared/components/top-app-bar/top-app-bar.service";

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
    UserPhotoComponent,
    NgOptimizedImage,
  ],
})
export class AdminUserDetailComponent implements OnDestroy {
  readonly title = 'User detail';
  readonly nav_path = navPath;
  error?: Error;
  private subscriptions = new Subscription();
  user?: readUser;

  constructor(
    private dialog: MatDialog,
    private db: FirestoreService,
    private fn: FunctionsService,
    private route: ActivatedRoute,
    private logger: ConsoleLoggerService,
    private topAppBarService: TopAppBarService,
  ) {
    this.topAppBarService.setOptions({
      title: `Admin ${this.title}`,
      loading: false,
      showBackBtn: true,
    });

    this.subscriptions.add(
      this.route.paramMap.subscribe(async (paramMap) => {
        const id = paramMap.get('userUID');
        const user = await this.db.docSnap<readUser>(`users/${id}`)
          .catch((error: FirebaseError) => {
            this.error = error;
            this.logger.error('Error loading user', error);
            return null;
          });
        if (!user || !user.exists()) {
          this.logger.error(`User does not exist => ${id}`);
          this.error = new Error('Something went wrong, user was not found.');
        }
        this.user = user?.data();
      }),
    );
  }

  updateAdminRole(user: readUser) {
    const confirmDialogContract: ConfirmDialogContract = {
      title: `${user.admin == true ? 'Revoke' : 'Grant'} admin?`,
      // eslint-disable-next-line max-len
      description: `${user.displayName ?? user.email} will ${user.admin == true ? 'no longer be an admin on their next successful login.' : 'be an admin on their next successful login.'}`,
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      id: 'confirm-update-admin-role-dialog',
      data: confirmDialogContract,
    });

    dialogRef.afterClosed().pipe(first()).forEach((confirm) => {
      if (confirm) {
        this.fn.httpsCallable<
          AdminUpdateClaimsRequest, AdminUpdateClaimsResponse
        >('admin-updateClaims', { user: user.id, admin: user.admin != true })
          .then(() => {
            // eslint-disable-next-line max-len
            this.logger.log(`Updated admin role for ${user.displayName ?? user.email}, changes will take effect on next successful login.`);
          }).catch((error: FunctionsError) => {
            this.logger.error(
              `Error updating admin role for ${user.displayName ?? user.email}`,
              error,
            );
        });
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
