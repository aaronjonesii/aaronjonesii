import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommentWithID } from "../../../../../shared/interfaces/comment";
import { UserWithID } from "../../../../../shared/interfaces/user";
import { FirestoreService } from "../../../../../shared/services/firestore.service";

@Component({
  selector: 'aj-project-detail-comment',
  templateUrl: './project-detail-comment.component.html',
  styleUrls: ['./project-detail-comment.component.scss']
})
export class ProjectDetailCommentComponent implements OnInit {
  @Input() comment?: CommentWithID;
  @Input() user: UserWithID | null = null;
  @Output() openComments = new EventEmitter<undefined>();
  public author: UserWithID | null = null;

  constructor(
    private db: FirestoreService,
  ) {}

  async ngOnInit() {
    if (this.isCommentOwner) this.author = this.user;
    else {
      this._assertComment(this.comment);

      const authorSnap = (await this.db.docSnap(this.comment.user));
      this.author = Object.assign({id: this.comment.user.id}, authorSnap.data()) as UserWithID;
    }
  }


  public get isCommentOwner(): boolean {
    return this.comment?.user?.id === this.user?.id;
  }

  private _assertComment(comment?: CommentWithID): asserts comment {
    if (!comment) {
      throw new Error(`This function must be called with a comment.`);
    }
  }
}
