import { Component, Input, OnInit } from '@angular/core';
import { CommentWithID } from "../../../../../../shared/interfaces/comment";
import { UserWithID } from "../../../../../../shared/interfaces/user";
import { arrayRemove, arrayUnion } from "@angular/fire/firestore";
import { ReportReason, WriteReport } from "../../../../../../shared/interfaces/report";
import { nav_path } from "../../../../../../app-routing.module";
import { Router } from "@angular/router";
import { ConsoleLoggerService } from "../../../../../../core/services/console-logger.service";
import { FirestoreService } from "../../../../../../shared/services/firestore.service";
import { MatDialogRef } from "@angular/material/dialog";
import { CommentsDialogComponent } from "../comments-dialog.component";

@Component({
  selector: 'aj-comment',
  templateUrl: './comments-dialog-comment.component.html',
  styleUrls: ['./comments-dialog-comment.component.scss']
})
export class CommentsDialogCommentComponent implements OnInit {
  @Input() comment?: CommentWithID;
  @Input() dialogRef?: MatDialogRef<CommentsDialogComponent>;
  @Input() user: UserWithID | null = null;
  public author: UserWithID | null = null;

  constructor(
    private router: Router,
    private db: FirestoreService,
    private cLog: ConsoleLoggerService,
  ) {
  }

  ngOnInit() {
    // fixme: investigate why this has to be delayed for the user to be present
    setTimeout(async () => {
      if (this.isCommentOwner) this.author = this.user;
      else {
        this._assertComment(this.comment);

        const authorSnap = (await this.db.docSnap(this.comment.user));
        this.author = Object.assign({id: this.comment.user.id}, authorSnap.data()) as UserWithID;
      }
    }, 100);
  }

  public async onLikeComment() {
    try {
      this._assertUser(this.user);
      this._assertComment(this.comment);

      const userRef = this.db.doc<UserWithID>(`users/${this.user.id}`);
      /** check if user already likes the comment */
      if (this.comment?.likes?.includes(userRef) && !this.comment?.dislikes?.includes(userRef)) return;

      await this.db.batch(async (batch) => {
        this._assertComment(this.comment); // fixme: investigate why this is needed here when used above

        const commentRef = this.db.doc(`${this.comment.parent.path}/comments/${this.comment.id}`);
        const commentUpdates = {
          likes: arrayUnion(userRef),
          dislikes: arrayRemove(userRef),
          updated: this.db.timestamp,
        };
        batch.update(commentRef, commentUpdates);
      }).catch(error => this.cLog.error(`Something went wrong liking comment`, error, this.comment, this.user));
    } catch (error) {
      this.cLog.error((<Error>error).message ?? `Something went wrong`, error);
    }
  }

  public async onDislikeComment() {
    try {
      this._assertUser(this.user);
      this._assertComment(this.comment);

      const userRef = this.db.doc<UserWithID>(`users/${this.user?.id}`);
      /** check if user already likes the comment */
      if (this.comment?.dislikes?.includes(userRef) && !this.comment?.likes?.includes(userRef)) return;

      await this.db.batch(async (batch) => {
        this._assertComment(this.comment); // fixme: investigate why this is needed here when used above

        const commentRef = this.db.doc(`${this.comment.parent.path}/comments/${this.comment.id}`);
        const commentUpdates = {
          likes: arrayRemove(userRef),
          dislikes: arrayUnion(userRef),
          updated: this.db.timestamp,
        };
        batch.update(commentRef, commentUpdates);
      }).catch(error => this.cLog.error(`Something went wrong disliking comment`, error, this.comment, this.user));
    } catch(error) {
      this.cLog.error((<Error>error).message ?? `Something went wrong`, error);
    }
  }

  public get likesComment(): boolean {
    return this.comment?.likes?.some(userRef => userRef.id === this.user?.id) ?? false;
  }

  public get dislikesComment(): boolean {
    if (!this.user || !this.comment) return false;
    return this.comment?.dislikes?.some(userRef => userRef.id === this.user?.id) ?? false;
  }

  public async onReport(): Promise<void> {
    try {
      this._assertUser(this.user);
      this._assertComment(this.comment);

      const userRef = this.db.doc<UserWithID>(`users/${this.user.id}`);
      const commentRef = this.db.doc<CommentWithID>(`${this.comment.parent.path}/comments/${this.comment.id}`);
      const report: WriteReport = {
        created: this.db.timestamp,
        by: userRef,
        reason: ReportReason.TEST_REASON,
        document: commentRef,
      };
      return await this.db.batch(async batch => {
        this._assertComment(this.comment); // fixme: investigate why this is needed here when used above

        const reportRef = this.db.doc(`reports/${this.db.newDocumentID}`);
        batch.set(reportRef, report);

        const userUpdates = {
          reported: arrayUnion(commentRef),
          updated: this.db.timestamp,
        };
        batch.update(userRef, userUpdates);
      }).then(() => this.cLog.log(`Submitted report, thank you for helping our community.`))
        .catch(error => this.cLog.error(`Something went wrong reporting comment`, error, report));
    } catch (error) {
      this.cLog.error((<Error>error).message ?? `Something went wrong`, error);
    }
  }

  public get reported(): boolean {
    if (!this.user || !this.comment) return false;
    return this.user?.reported?.some(report => report.id == this.comment?.id) ?? false;
  }

  public get isCommentOwner(): boolean {
    return this.comment?.user?.id === this.user?.id;
  }

  private _assertUser(user: UserWithID | null): asserts user {
    if (!user) {
      this.router.navigate([nav_path.signIn], { queryParams: { "redirectURL": this.router.routerState.snapshot.url } });
      if (this.dialogRef) this.dialogRef.close();
      throw new Error(`You must be signed in`);
    }
  }

  private _assertComment(comment?: CommentWithID): asserts comment {
    if (!comment) {
      throw new Error(`This function must be called with a comment.`);
    }
  }
}
