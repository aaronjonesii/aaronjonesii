import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import {
  MAT_DIALOG_DATA, MatDialogModule, MatDialogRef,
} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DocumentReference } from '@angular/fire/firestore';
import { tap } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  CommentsDialogCommentComponent,
} from './comments-dialog-comment/comments-dialog-comment.component';
import {
  UserPhotoComponent,
} from '../../../../shared/components/user-photo/user-photo.component';
import {
  LoadingComponent,
} from '../../../../shared/components/loading/loading.component';
import {
  CommentWithID, WriteComment,
} from '../../../../shared/interfaces/comment';
import { UserWithID } from '../../../../shared/interfaces/user';
import {
  FirestoreService,
} from '../../../../shared/services/firestore.service';
import { navPath } from '../../../../app.routes';
import {
  ConsoleLoggerService,
} from '../../../../shared/services/console-logger.service';

export interface CommentsDialogContract {
  comments$?: Observable<CommentWithID[] | null>,
  selectedComment?: string,
  user$: Observable<UserWithID | null>,
  parent: DocumentReference,
}

@Component({
  selector: 'aj-comments-dialog',
  templateUrl: './comments-dialog.component.html',
  styleUrl: './comments-dialog.component.scss',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    AsyncPipe,
    UserPhotoComponent,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommentsDialogCommentComponent,
    LoadingComponent,
  ],
})
export class CommentsDialogComponent {
  comments$ = this.data.comments$?.pipe(
    tap((comments) => this.commentCount = comments?.length ?? 0),
  );
  commentInputContainerInFocus = false;
  user$ = this.data.user$;
  @ViewChild('commentInput') commentInput?: ElementRef;
  commentFormControl = new FormControl<string>(
    '',
    { nonNullable: true, validators: Validators.required }
  );
  commentCount = 0;

  constructor(
    private router: Router,
    private db: FirestoreService,
    private logger: ConsoleLoggerService,
    public dialogRef: MatDialogRef<CommentsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CommentsDialogContract,
  ) {}

  focusCommentInputContainer(user: UserWithID | null): void {
    try {
      this._assertUser(user);

      this.commentInputContainerInFocus = true;
    } catch (error) {
      this.logger.error(
        (<Error>error).message ?? `Something went wrong`, error,
      );
    }
  }

  onCancelComment(): void {
    this.commentInputContainerInFocus = false;
    this.commentInput?.nativeElement?.blur();
    this.commentFormControl.reset('');
  }

  async addComment(user: UserWithID | null): Promise<void> {
    try {
      this._assertUser(user);

      const comment: WriteComment = {
        parent: this.data.parent,
        user: this.db.doc(`users/${user.id}`),
        content: this.commentFormControl.value,
        created: this.db.timestamp,
        author: {
          name: user?.displayName,
          image: user?.photoURL,
        },
      };

      await this.db.add(`${comment.parent?.path}/comments`, comment)
        .then(() => this.onCancelComment())
        .catch((error) => {
          this.logger.error(
            `Something went wrong adding comment`, error, comment,
          );
        });
    } catch (error) {
      this.logger.error(
        (<Error>error).message ?? `Something went wrong`, error,
      );
    }
  }

  onPhotoClick() {
    this.router.navigate([navPath.accountDetails])
      .then(() => this.dialogRef.close());
  }

  private _assertUser(user: UserWithID | null): asserts user {
    if (!user) {
      this.router.navigate(
        [navPath.signIn],
        {
          queryParams: { 'redirectURL': this.router.routerState.snapshot.url },
          fragment: 'comments',
        },
      ).then(() => this.dialogRef.close());
      throw new Error(`You must be signed in`);
    }
  }
}
