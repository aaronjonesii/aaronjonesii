import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { CommentWithID, ReadComment, WriteComment } from "../../../../../shared/interfaces/comment";
import { UserWithID } from "../../../../../shared/interfaces/user";
import { Router } from "@angular/router";
import { FormControl, Validators } from "@angular/forms";
import { nav_path } from "../../../../../app-routing.module";
import { ConsoleLoggerService } from "../../../../../core/services/console-logger.service";
import { arrayRemove, arrayUnion, DocumentReference } from "@angular/fire/firestore";
import { FirestoreService } from "../../../../../shared/services/firestore.service";
import { tap } from "rxjs/operators";

@Component({
  selector: 'aj-comments-dialog',
  templateUrl: './comments-dialog.component.html',
  styleUrls: ['./comments-dialog.component.scss']
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
      /* swallow errors */
    }
  }

  public onCancelComment(): void {
    this.commentInputContainerInFocus = false;
    this.commentInput?.nativeElement?.blur();
    this.commentFormControl.reset('');
  }

  public async addComment(user: UserWithID | null): Promise<void> {
    this._assertUser(user);

    const comment: WriteComment = {
      parent: this.data.parent,
      user: this.db.doc(`users/${user.id}`),
      content: this.commentFormControl.value,
      created: this.db.timestamp,
    };

    await this.db.add(`${comment.parent?.path}/comments`, comment)
      .then(() => this.onCancelComment())
      .catch(error => this.cLog.error(`Something went wrong adding comment`, error, comment));
  }

  public async onLikeComment(comment: CommentWithID, user: UserWithID | null) {
    this._assertUser(user);

    const userRef = this.db.doc<UserWithID>(`users/${user?.id}`);
    /** check if user already likes the comment */
    if (comment?.likes?.includes(userRef) && !comment?.dislikes?.includes(userRef)) return;

    await this.db.batch(async (batch) => {
      const commentRef = this.db.doc(`${comment.parent.path}/comments/${comment.id}`);
      const commentUpdates = {
        likes: arrayUnion(userRef),
        dislikes: arrayRemove(userRef),
        updated: this.db.timestamp,
      };
      batch.update(commentRef, commentUpdates);
    }).catch(error => this.cLog.error(`Something went wrong liking comment`, error, comment, user));
  }

  public async onDislikeComment(comment: CommentWithID, user: UserWithID | null) {
    this._assertUser(user);

    const userRef = this.db.doc<UserWithID>(`users/${user?.id}`);
    /** check if user already likes the comment */
    if (comment?.dislikes?.includes(userRef) && !comment?.likes?.includes(userRef)) return;

    await this.db.batch(async (batch) => {
      const commentRef = this.db.doc(`${comment.parent.path}/comments/${comment.id}`);
      const commentUpdates = {
        likes: arrayRemove(userRef),
        dislikes: arrayUnion(userRef),
        updated: this.db.timestamp,
      };
      batch.update(commentRef, commentUpdates);
    }).catch(error => this.cLog.error(`Something went wrong disliking comment`, error, comment, user));
  }

  public likesComment(comment: CommentWithID, user: UserWithID | null) {
    if (!user) return false;
    return comment.likes?.includes(this.db.doc(`users/${user.id}`));
  }

  public dislikesComment(comment: CommentWithID, user: UserWithID | null) {
    if (!user) return false;
    return comment.dislikes?.includes(this.db.doc(`users/${user.id}`));
  }

  private _assertUser(user: UserWithID | null): asserts user {
    if (!user) {
      this.router.navigate([nav_path.signIn], { queryParams: { "redirectURL": this.router.routerState.snapshot.url } })
        .then(() => this.dialogRef.close())
        .then(() => this.cLog.log(`You must be signed in`));
      return;
    }
  }
}
