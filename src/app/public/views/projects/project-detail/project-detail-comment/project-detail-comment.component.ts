import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommentWithID } from "../../../../../shared/interfaces/comment";
import { UserPhotoComponent } from "../../../../../shared/components/user-photo/user-photo.component";
import { DateAgoPipe } from "../../../../../shared/pipes/date-ago.pipe";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'aj-project-detail-comment',
  templateUrl: './project-detail-comment.component.html',
  styleUrl: './project-detail-comment.component.scss',
  standalone: true,
  imports: [
    UserPhotoComponent,
    DateAgoPipe,
    MatButtonModule,
    MatIconModule,
  ],
})
export class ProjectDetailCommentComponent {
  @Input() comment?: CommentWithID;
  @Output() readonly openComments = new EventEmitter<undefined>();
}
