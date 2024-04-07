import { Component, Inject, ViewEncapsulation, makeStateKey, TransferState } from '@angular/core';
import { map, Observable, of, switchMap } from "rxjs";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { User } from '@angular/fire/auth';
import { MatDialog } from "@angular/material/dialog";
import { increment, where } from "@angular/fire/firestore";
import { CommentsDialogComponent } from "./comments-dialog/comments-dialog.component";
import { AsyncPipe, DatePipe, DOCUMENT, NgOptimizedImage } from "@angular/common";
import { tap } from "rxjs/operators";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatTabsModule } from "@angular/material/tabs";
import { ProjectDetailCommentComponent } from "./project-detail-comment/project-detail-comment.component";
import { MatIconModule } from "@angular/material/icon";
import { UserPhotoComponent } from "../../../shared/components/user-photo/user-photo.component";
import { LoadingComponent } from "../../../shared/components/loading/loading.component";
import { nav_path } from 'src/app/app-routing.module';
import { ProjectStatus, ProjectVisibility, ReadProject } from "../../../shared/interfaces/project";
import { CommentWithID } from "../../../shared/interfaces/comment";
import { FirestoreService } from "../../../shared/services/firestore.service";
import { AuthService } from "../../../core/services/auth.service";
import { ConsoleLoggerService } from "../../../core/services/console-logger.service";
import { SeoService } from "../../../core/services/seo.service";
import { TopAppBarService } from "../../../shared/components/top-app-bar/top-app-bar.service";
import { appInformation } from "../../../information";
import { readUser, UserWithID } from "../../../shared/interfaces/user";
import { ConfirmDialogComponent } from "../../../shared/components/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'aj-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss',
  /* eslint-disable-next-line @angular-eslint/use-component-view-encapsulation */
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    MatButtonModule,
    RouterLink,
    AsyncPipe,
    DatePipe,
    UserPhotoComponent,
    MatDividerModule,
    MatTabsModule,
    ProjectDetailCommentComponent,
    MatIconModule,
    LoadingComponent,
    NgOptimizedImage,
  ],
})
export class ProjectDetailComponent {
  readonly nav_path = nav_path;
  projectID$: Observable<string | null>;
  project$: Observable<ReadProject | null>;
  user$ = this.auth.loadUser.pipe(
    switchMap((user) => {
      if (user) return this.getUser$(user);
      else return of(user);
    }),
  );
  notAvailable = false;
  comments$: Observable<CommentWithID[] | null>;
  readonly ProjectStatus = ProjectStatus;
  relatedProjects$: Observable<ReadProject[] | null>;

  constructor(
    private route: ActivatedRoute,
    private db: FirestoreService,
    private auth: AuthService,
    private cLog: ConsoleLoggerService,
    private router: Router,
    private dialog: MatDialog,
    private seoService: SeoService,
    @Inject(DOCUMENT) private document: Document,
    private state: TransferState,
    private topAppBarService: TopAppBarService,
  ) {
    /** title service */
    this.topAppBarService.setOptions({
      title: appInformation.title,
      showBackBtn: true,
      loading: false,
    });

    this.projectID$ = this.route.paramMap.pipe(
      map((params) => params.get('projectID')),
    );

    const key = makeStateKey<ReadProject>('PROJECT-DETAIL');
    const existing = this.state.get(key, null);
    this.project$ = this.projectID$.pipe(
      switchMap((projectID) => existing ? of(existing) : this.getProject$(projectID)
        .pipe(tap(project => this.state.set(key, project)))),
      tap(() => this._routeToFragment()),
    );

    this.comments$ = this.project$.pipe(switchMap((project) => this.getComments$(project)));

    this.relatedProjects$ = this.project$.pipe(
      switchMap((project) => this.getRelatedProjects$(project)),
    );
  }

  private _routeToFragment() {
    this.router.routerState.root.fragment
      .forEach(fragment => {
        if (!fragment) return;

        const el = this.document.querySelector(`#${fragment}`);
        if (!el) return;

        el?.scrollIntoView();
      });
  }

  getUser$(user: User) {
    return (this.db.doc$(`users/${user.uid}`) as Observable<readUser>)
      .pipe(map(userDoc => (Object.assign({id: user.uid}, userDoc) as UserWithID)));
  }

  private getProject$(id: string | null): Observable<ReadProject | null> {
    return (this.db.doc$(`projects/${id}`) as Observable<ReadProject>)
      .pipe(
        switchMap(async (project) => {
          if (!project) {
            this.notAvailable = true;
            return null;
          }
          /** seo service */
          this.seoService.generateTags({
            title: project.name,
            route: `${nav_path.projects}/${project.slug}`,
            author: appInformation.name,
            description: project.description,
            type: 'article',
            image: project.image ?? '',
          });

          if (!project?.shards) return project;

          /** increment view count */
          const shard_id = Math.floor(Math.random() * project.shards).toString();
          const shardRef = this.db.doc<object>(`projects/${project.slug}/shards/${shard_id}`);
          await this.db.update(shardRef, { views: increment(1) });

          /** get view count from shards */
          let views = 0;
          for (let i = 0; i < project.shards; i++) {
            views = views + (await this.db.docSnap(`projects/${project.slug}/shards/${i.toString()}`)).get('views');
          }

          return Object.assign({views: views}, project);
        }),
      );
  }

  getComments$(project: ReadProject | null): Observable<CommentWithID[] | null> {
    if (!project) return of(null);

    return this.db.col$<CommentWithID>(`projects/${project.slug}/comments`, { idField: 'id' });
  }

  private getRelatedProjects$(project: ReadProject | null): Observable<ReadProject[] | null> {
    if (!project) return of(null);

    return this.db.colQuery$<ReadProject>(
      `projects`,
      {},
      /** filter out private projects */
      where('visibility', '==', ProjectVisibility.PUBLIC),
      /** filter out drafts */
      where('status', '!=', ProjectStatus.DRAFT),
    ).pipe(
      /** filter projects if they don't match current project's tags */
      map((projects) => {
        return projects.filter((p) => {
          if (!p?.tags?.length) return false;
          if (p.slug === project.slug) return false;

          return p?.tags.some((t) => project?.tags?.includes(t));
        });
      }),
      /** sort related projects by decreasing number of matching tags */
      map((relatedProjects) => {
        return relatedProjects.sort((a,b) => {
          const aIntersection = a?.tags?.filter((t) => project?.tags?.includes(t)) ?? [];
          const bIntersection = b?.tags?.filter((t) => project?.tags?.includes(t)) ?? [];
          return bIntersection.length - aIntersection.length;
        });
      }),
    );
  }

  isOwner(project: ReadProject, user: UserWithID | null): boolean {
    return user ? project.roles[user.id] === 'owner' : false;
  }

  async updateFollowingStatus(user: UserWithID | null) {
    try {
      this.auth.assertUser(user);

      if (user?.following) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          id: 'confirm-unfollow-dialog',
          data: {
            description: `Unfollow from ${appInformation.name}?`,
            buttonText: `Unfollow`,
          }
        });

        dialogRef.afterClosed()
          .forEach(async confirm => confirm ? await this._updateFollowStatus(user) : undefined);
      } else await this._updateFollowStatus(user);
    } catch (error) {
      /* swallow errors */
    }
  }

  private async _updateFollowStatus(user: UserWithID): Promise<void> {
    return await this.db.update(`users/${user.id}`, { following: !user?.following ?? false })
      .then(() => this.cLog.log(user?.following ? 'Unfollowed' : 'Followed'));
  }

  openComments(project: ReadProject): void {
    this.dialog.open(CommentsDialogComponent, {
      id: 'comments-dialog',
      data: {
        comments$: this.comments$,
        selectedComment: undefined,
        user$: this.user$,
        parent: this.db.doc(`projects/${project.slug}`),
      },
      disableClose: true,
    });
  }
}
