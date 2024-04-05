import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { CommentWithID, WriteComment } from "../../../../../shared/interfaces/comment";
import { UserWithID } from "../../../../../shared/interfaces/user";
import { Router } from "@angular/router";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { nav_path } from "../../../../../app-routing.module";
import { ConsoleLoggerService } from "../../../../../core/services/console-logger.service";
import { DocumentReference } from "@angular/fire/firestore";
import { FirestoreService } from "../../../../../shared/services/firestore.service";
import { tap } from "rxjs/operators";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { AsyncPipe } from "@angular/common";
import { UserPhotoComponent } from "../../../../../shared/components/user-photo/user-photo.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { CommentsDialogCommentComponent } from "./comments-dialog-comment/comments-dialog-comment.component";
import { LoadingComponent } from "../../../../../shared/components/loading/loading.component";

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
  public comments$ = this.data.comments$
    ?.pipe(tap(comments => this.commentCount = comments?.length ?? 0));
  public commentInputContainerInFocus = false;
  public user$ = this.data.user$;
  @ViewChild('commentInput') commentInput?: ElementRef;
  public commentFormControl = new FormControl<string>(
    '',
    {nonNullable: true, validators: Validators.required}
  );
  public commentCount = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      comments$?: Observable<CommentWithID[]>,
      selectedComment?: string,
      user$?: Observable<UserWithID>,
      parent: DocumentReference,
    },
    public dialogRef: MatDialogRef<CommentsDialogComponent>,
    private router: Router,
    private cLog: ConsoleLoggerService,
    private db: FirestoreService,
  ) {}

  public focusCommentInputContainer(user: UserWithID | null): void {
    try {
      this._assertUser(user);

      this.commentInputContainerInFocus = true;
    } catch (error) {
      this.cLog.error((<Error>error).message ?? `Something went wrong`, error);
    }
  }

  public onCancelComment(): void {
    this.commentInputContainerInFocus = false;
    this.commentInput?.nativeElement?.blur();
    this.commentFormControl.reset('');
  }

  public async addComment(user: UserWithID | null): Promise<void> {
    try {
      this._assertUser(user);

      const comment: WriteComment = {
        parent: this.data.parent,
        user: this.db.doc(`users/${user.id}`),
        content: this.commentFormControl.value,
        created: this.db.timestamp,
        author: {
          name: user?.displayName,
          image: user?.photoURL
        },
      };

      await this.db.add(`${comment.parent?.path}/comments`, comment)
        .then(() => this.onCancelComment())
        .catch(error => this.cLog.error(`Something went wrong adding comment`, error, comment));
    } catch(error) {
      this.cLog.error((<Error>error).message ?? `Something went wrong`, error);
    }
  }

  public onPhotoClick() {
    this.router.navigate([nav_path.accountDetails])
      .then(() => this.dialogRef.close());
  }

  private _assertUser(user: UserWithID | null): asserts user {
    if (!user) {
      this.router.navigate([nav_path.signIn], { queryParams: { "redirectURL": this.router.routerState.snapshot.url }, fragment: 'comments' })
        .then(() => this.dialogRef.close());
      throw new Error(`You must be signed in`);
    }
  }
}
