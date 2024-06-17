import {
  ChangeDetectionStrategy, ViewEncapsulation, OnDestroy,
  Component, computed, signal, OnInit,
} from '@angular/core';
import {
  Observable, Subscription,
  of, switchMap,
  map, filter,
} from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  AsyncPipe,
  DatePipe, NgClass,
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
  ProjectStatus, ProjectWithID, ProjectWithTech,
} from '../../../shared/interfaces/project';
import {
  TopAppBarService,
} from '../../../shared/components/top-app-bar/top-app-bar.service';
import { appInformation } from '../../../information';
import { UserWithID } from '../../../shared/interfaces/user';
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
import { MatChipsModule } from '@angular/material/chips';
import { DateAgoPipe } from '../../../shared/pipes/date-ago.pipe';
import {
  ConsoleLoggerService,
} from '../../../shared/services/console-logger.service';
// eslint-disable-next-line max-len
import { ProjectTechnologiesComponent } from '../../../shared/components/project-technologies/project-technologies.component';

@Component({
  selector: 'aj-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss',
  /* eslint-disable-next-line max-len */
  /* eslint-disable-next-line @angular-eslint/use-component-view-encapsulation */
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers: [DatePipe, DateAgoPipe],
  imports: [
    NgClass,
    DatePipe,
    AsyncPipe,
    RouterLink,
    MatTabsModule,
    MatIconModule,
    MatChipsModule,
    MatButtonModule,
    LoadingComponent,
    NgOptimizedImage,
    NgTemplateOutlet,
    MatDividerModule,
    SkeletonComponent,
    UserPhotoComponent,
    ProjectDetailCommentComponent,
    ProjectTechnologiesComponent,
  ],
})
export class ProjectDetailComponent implements OnInit, OnDestroy {
  private projectSignal = signal<ProjectWithTech | null>(null);
  project = this.projectSignal.asReadonly();
  private userSignal = signal<UserWithID | null>(null);
  user = this.userSignal.asReadonly();
  private projectFetchStatusSignal = signal(FetchStatus.PENDING);
  projectFetchStatus = this.projectFetchStatusSignal.asReadonly();
  private loadedSignal = signal(false);
  isBrowser = signal(this.ssrSafeService.isBrowser);
  showMore = signal(false);

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
  projectViewsText = computed(() => {
    const projectViews = this.project()?.views ?? 0;
    return `${projectViews} ${this.project()?.views === 1 ? 'view' : 'views'}`;
  });
  projectLastUpdatedText = computed(() => {
    const project = this.project();
    if (!project?.updated) return 'Unknown updated date';
    const lastUpdatedDate = this.datePipe
      .transform(project.updated.seconds * 1000);
    return `Last updated on ${lastUpdatedDate}`;
  });
  projectCreatedText = computed(() => {
    const project = this.project();
    if (!project?.created) return 'Unknown created date';
    const createdDate = this.datePipe
      .transform(project.created.seconds * 1000);
    return `Created on ${createdDate}`;
  });
  projectCreatedOrLastUpdatedText = computed(() => {
    const project = this.project();
    if (project?.updated) {
      const lastUpdatedDateAgo = this.dateAgoPipe
        .transform(project.updated.seconds * 1000);
      return `Last updated ${lastUpdatedDateAgo}`;
    } else if (project?.created) {
      const createdDateAgo = this.dateAgoPipe
        .transform(project.created.seconds * 1000);
      return `Created ${createdDateAgo}`;
    } else {
      return 'Unknown created date';
    }
  });

  constructor(
    private auth: AuthService,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private seoService: SeoService,
    private routing: RoutingService,
    private dateAgoPipe: DateAgoPipe,
    private usersService: UsersService,
    private logger: ConsoleLoggerService,
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
      map((params) => params.get('projectID') || 'undefined'),
    );

    const project$ = projectID$.pipe(
      /** fixme: receiving the below strings as the projectId instead of actual
       * skeleton.component.css.map, navigation-rail.component.css.map */
      filter((projectId) => !projectId.includes('.')),
      switchMap((projectId) => {
        return this.projectsService.getProjectById$(projectId);
      }),
      filter((project) => !!project),
      switchMap((project) => {
        return this.projectsService
          .projectWihTechnologies$(<ProjectWithID>project);
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

  /* eslint-disable-next-line @angular-eslint/no-async-lifecycle-method */
  async ngOnInit() {
    /** Wait to load on server */
    const maxMillisecondsToWait = 2000;
    const incrementMilliseconds = 100;
    const maxTries = Math.floor(maxMillisecondsToWait / incrementMilliseconds);
    let i = 0;
    while (i < maxTries && !this.loaded()) {
      await this.delay(incrementMilliseconds);
      i++;
    }
  }

  delay = (timeout: number) => new Promise<void>((resolve) => {
    setTimeout(resolve, timeout);
  });

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  async openComments(): Promise<void> {
    const project = this.project();
    if (!project) return;
    if (!this.user()) {
      this.auth.navigateToSignInWithRedirectUrl();
      this.logger.warn('Must be signed in to add/view comments');
      return;
    }
    this.projectsService.openProjectCommentsDialogById(
      project.id,
      this.user$() as Observable<UserWithID>,
    );
  }

  onTryLoadAgain() {
    window.location.reload();
  }

  onShowMoreToggle() {
    this.showMore.set(!this.showMore());
  }

  async onShareBtnClick() {
    const project = this.project();
    if (!project) return;

    return this.projectsService.shareProject(project);
  }
}
