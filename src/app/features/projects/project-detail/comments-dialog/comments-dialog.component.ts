import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  MAT_DIALOG_DATA, MatDialogModule, MatDialogRef,
} from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
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
  CommentWithID,
} from '../../../../shared/interfaces/comment';
import { UserWithID } from '../../../../shared/interfaces/user';
import { navPath } from '../../../../app.routes';
import {
  ConsoleLoggerService,
} from '../../../../shared/services/console-logger.service';
import { ProjectsService } from '../../../../shared/services/projects.service';
import { UsersService } from '../../../../shared/services/users.service';
import { AuthService } from '../../../../shared/services/auth.service';

export interface CommentsDialogContract {
  comments$?: Observable<CommentWithID[] | null>,
  selectedComment?: string,
  user$: Observable<UserWithID | null>,
  projectId: string,
}

@Component({
  selector: 'aj-comments-dialog',
  templateUrl: './comments-dialog.component.html',
  styleUrl: './comments-dialog.component.scss',
  standalone: true,
  imports: [
    AsyncPipe,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    LoadingComponent,
    UserPhotoComponent,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommentsDialogCommentComponent,
  ],
})
export class CommentsDialogComponent implements OnInit {
  comments$: Observable<CommentWithID[] | null> = of(null);
  commentInputContainerInFocus = false;
  user$: Observable<UserWithID | null> = of(null);
  @ViewChild('commentInput') commentInput?: ElementRef;
  commentFormControl = new FormControl<string>(
    '',
    { nonNullable: true, validators: Validators.required }
  );
  commentCount = 0;
  private projectId = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private usersService: UsersService,
    private logger: ConsoleLoggerService,
    private projectsService: ProjectsService,
    public dialogRef: MatDialogRef<CommentsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CommentsDialogContract,
  ) {}

  ngOnInit() {
    if (this.data.projectId) this.projectId = this.data.projectId;
    if (this.data.user$) this.user$ = this.data.user$;
    if (this.data.comments$) this.comments$ = this.data.comments$;
  }

  focusCommentInputContainer(user: UserWithID | null): void {
    this.authService.assertUser(user);

    this.commentInputContainerInFocus = true;
  }

  onCancelComment(): void {
    this.commentInputContainerInFocus = false;
    this.commentInput?.nativeElement?.blur();
    this.commentFormControl.reset('');
  }

  async addComment(user: UserWithID | null): Promise<void> {
    if (!user) return;
    const userRef = this.usersService.getUserReference(user.id);
    const commentMessage = this.commentFormControl.value;
    await this.projectsService.addProjectComment(
      this.projectId, user, userRef, commentMessage,
    ).then(() => this.onCancelComment());
  }

  onPhotoClick() {
    this.router.navigate([navPath.accountDetails])
      .then(() => this.dialogRef.close());
  }
}
