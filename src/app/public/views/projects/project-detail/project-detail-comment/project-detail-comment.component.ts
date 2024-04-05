import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommentWithID } from "../../../../../shared/interfaces/comment";

@Component({
  selector: 'aj-project-detail-comment',
  templateUrl: './project-detail-comment.component.html',
  styleUrls: ['./project-detail-comment.component.scss']
})
export class ProjectDetailCommentComponent {
  @Input() comment?: CommentWithID;
  @Output() readonly openComments = new EventEmitter<undefined>();
}
