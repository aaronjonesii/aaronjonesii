import {
  ChangeDetectionStrategy, ViewEncapsulation,
  ChangeDetectorRef, OnDestroy,
  Component, computed, signal, OnInit,
} from '@angular/core';
import {
  Observable, Subscription,
  of, switchMap,
  first, map,
} from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {
  AsyncPipe,
  DatePipe,
  NgOptimizedImage,
  NgTemplateOutlet,
} from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import {
  ProjectDetailCommentComponent,
} from './project-detail-comment/project-detail-comment.component';
import { MatIconModule } from '@angular/material/icon';
import {
  UserPhotoComponent,
} from '../../../shared/components/user-photo/user-photo.component';
import {
  LoadingComponent,
} from '../../../shared/components/loading/loading.component';
import {
  ProjectStatus, ProjectWithID,
} from '../../../shared/interfaces/project';
import {
  TopAppBarService,
} from '../../../shared/components/top-app-bar/top-app-bar.service';
import { appInformation } from '../../../information';
import { UserWithID } from '../../../shared/interfaces/user';
import {
  ConfirmDialogComponent,
  ConfirmDialogContract,
} from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { navPath } from '../../../app.routes';
import { AuthService } from '../../../shared/services/auth.service';
import { SeoService } from '../../../shared/services/seo.service';
import { RoutingService } from '../../../shared/services/routing.service';
import { FetchStatus } from '../../../shared/enums/fetch-status';
import {
  SkeletonComponent,
} from '../../../shared/components/skeleton/skeleton.component';
import { ProjectsService } from '../../../shared/services/projects.service';
import { UsersService } from '../../../shared/services/users.service';
import { SSRSafeService } from '../../../shared/services/ssr-safe.service';

@Component({
  selector: 'aj-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss',
  /* eslint-disable-next-line max-len */
  /* eslint-disable-next-line @angular-eslint/use-component-view-encapsulation */
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    DatePipe,
    AsyncPipe,
    RouterLink,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    LoadingComponent,
    NgOptimizedImage,
    NgTemplateOutlet,
    MatDividerModule,
    SkeletonComponent,
    UserPhotoComponent,
    ProjectDetailCommentComponent,
  ],
})
export class ProjectDetailComponent implements OnInit, OnDestroy {
  private projectSignal = signal<ProjectWithID | null>(null);
  project = this.projectSignal.asReadonly();
  private userSignal = signal<UserWithID | null>(null);
  user = this.userSignal.asReadonly();
  private projectFetchStatusSignal = signal(FetchStatus.PENDING);
  projectFetchStatus = this.projectFetchStatusSignal.asReadonly();
  private loadedSignal = signal(false);
  isBrowser = signal(this.ssrSafeService.isBrowser);

  loaded = this.loadedSignal.asReadonly();
  protected readonly navPath = navPath;
  protected readonly FetchStatus = FetchStatus;
  protected readonly ProjectStatus = ProjectStatus;
  private subscriptions = new Subscription();

  user$ = computed(() => of(this.user()));
  isOwner = computed(() => {
    const user = this.user();
    return user ? this.project()?.roles[user.id] === 'owner' : false;
  });
  commentsSignal$ = computed(() => {
    const project = this.project();
    return project ?
      this.projectsService.getProjectComments$(project.id) :
      of(null);
  });
  relatedProjectsSignal$ = computed(() => {
    const project = this.project();
    return project ?
      this.projectsService.getRelatedProjectsByTags$(project.id, project.tags) :
      of(null);
  });

  constructor(
    private auth: AuthService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private seoService: SeoService,
    private routing: RoutingService,
    private cdRef: ChangeDetectorRef,
    private usersService: UsersService,
    private ssrSafeService: SSRSafeService,
    private projectsService: ProjectsService,
    private topAppBarService: TopAppBarService,
  ) {
    /** title service */
    this.topAppBarService.setOptions({
      title: appInformation.title,
      showBackBtn: true,
      loading: false,
    });

    const projectID$ = this.route.paramMap.pipe(
      map((params) => params.get('projectID') ?? 'undefined'),
    );

    const project$ = projectID$.pipe(
      switchMap((projectID) => {
        return this.projectsService.getProjectById$(projectID);
      }),
    );

    this.subscriptions.add(
      project$.subscribe((project) => {
        if (!project) {
          this.projectFetchStatusSignal.set(FetchStatus.ERROR);
          this.loadedSignal.set(true);
        } else {
          this.seoService.generateProjectTags(project);
          this.projectSignal.set(project);
          this.projectFetchStatusSignal.set(FetchStatus.SUCCESS);
        }
        this.loadedSignal.set(true);
      }),
    );

    this.subscriptions.add(
      this.auth.loadUser.subscribe(async (user) => {
        this.userSignal.set(
          user ? await this.usersService.getUserFromDB(user) : null,
        );
      }),
    );

    this.routing.watchAndRouteToFragment();
  }

  ngOnInit() {
    /** Wait to load on server */
    setTimeout(() => {}, 100);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  async updateFollowingStatus() {
    const user = this.user();
    this.auth.assertUser(user);

    if (user?.following) {
      const confirmDialogContract: ConfirmDialogContract = {
        description: `Unfollow from ${appInformation.name}?`,
        buttonText: `Unfollow`,
      };
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        id: 'confirm-unfollow-dialog',
        data: confirmDialogContract,
      });

      dialogRef.afterClosed().pipe(first()).forEach(async (confirm) => {
        return confirm ? await this._updateFollowStatus(user) : undefined;
      });
    } else await this._updateFollowStatus(user);
  }

  private async _updateFollowStatus(user: UserWithID): Promise<void> {
    if (!user) return;

    await this.usersService.updateUserFollowingStatus(user)
      .then(() => {
        this.userSignal.set({ ...user, following: !user.following });
      });
  }

  async openComments(): Promise<void> {
    const project = this.project();
    if (!project || !this.user()) return;
    this.projectsService.openProjectCommentsDialogById(
      project.id,
      this.user$() as Observable<UserWithID>,
    );
  }

  onTryLoadAgain() {
    window.location.reload();
  }
}
