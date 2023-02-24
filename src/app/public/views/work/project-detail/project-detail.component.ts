import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { map, Observable, of, startWith, switchMap } from "rxjs";
import { ProjectStatus, ProjectVisibility, ReadProject } from "../../../../shared/interfaces/project";
import { ActivatedRoute, Router } from "@angular/router";
import { FirestoreService } from "../../../../shared/services/firestore.service";
import { nav_path } from "../../../../app-routing.module";
import { AuthService } from "../../../../core/services/auth.service";
import { ConsoleLoggerService } from "../../../../core/services/console-logger.service";
import { readUser, UserWithID } from "../../../../shared/interfaces/user";
import { User } from '@angular/fire/auth';
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "../../../../shared/components/confirm-dialog/confirm-dialog.component";
import { appInformation } from "../../../../information";
import { increment, where } from "@angular/fire/firestore";
import { SeoService } from "../../../../core/services/seo.service";
import { CommentsDialogComponent } from "./comments-dialog/comments-dialog.component";
import { CommentWithID } from "../../../../shared/interfaces/comment";
import { DOCUMENT } from "@angular/common";
import { tap } from "rxjs/operators";
import { makeStateKey, TransferState } from "@angular/platform-browser";

@Component({
  selector: 'aj-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProjectDetailComponent {
  public readonly nav_path = nav_path;
  public projectID$: Observable<string | null>;
  public project$: Observable<ReadProject | null>;
  public user$ = this.auth.loadUser.pipe(
    switchMap(user => {
      if (user) return this.getUser$(user);
      else return of(user);
    }),
  );
  public notAvailable = false;
  public comments$: Observable<CommentWithID[] | null>;
  public readonly ProjectStatus = ProjectStatus;
  public relatedProjects$: Observable<ReadProject[] | null>;

  constructor(
    private route: ActivatedRoute,
    private db: FirestoreService,
    private auth: AuthService,
    private cLog: ConsoleLoggerService,
    private router: Router,
    private dialog: MatDialog,
    private seo: SeoService,
    @Inject(DOCUMENT) private document: Document,
    private state: TransferState,
  ) {
    this.projectID$ = route.paramMap.pipe(
      map((params) => params.get('projectID')),
    );

    this.project$ = this.projectID$.pipe(
      switchMap((projectID) => this.getProject(projectID)),
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

  public getUser$(user: User) {
    return (this.db.doc$(`users/${user.uid}`) as Observable<readUser>)
      .pipe(map(userDoc => (Object.assign({id: user.uid}, userDoc) as UserWithID)));
  }

  private getProject(id: string | null): Observable<ReadProject | null> {
    const key = makeStateKey<ReadProject>('PROJECT-DETAIL');
    const existing = this.state.get(key, null);
    return (this.db.doc$(`projects/${id}`) as Observable<ReadProject>)
      .pipe(
        existing ? startWith(existing) : switchMap(async (project) => {
          if (!project) {
            this.notAvailable = true;
            return null;
          }

          /** seo service */
          this.seo.generateTags({
            title: project.name,
            route: `${nav_path.work}/${project.slug}`,
            author: appInformation.name,
            description: project.description,
            type: 'article',
            image: project.image ?? '',
          });

          if (!project?.shards) return project;

          /** increment view count */
          const shard_id = Math.floor(Math.random() * project.shards).toString();
          const shardRef = this.db.doc(`projects/${project.slug}/shards/${shard_id}`);
          await this.db.update(shardRef, { views: increment(1) });

          /** get view count from shards */
          let views = 0;
          for (let i = 0; i < project.shards; i++) {
            views = views + (await this.db.docSnap(`projects/${project.slug}/shards/${i.toString()}`)).get('views');
          }

          return Object.assign({views: views}, project);
        }),
        tap(project => this.state.set(key, project)),
      );
  }

  public getComments$(project: ReadProject | null): Observable<CommentWithID[] | null> {
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

  public isOwner(project: ReadProject, user: UserWithID | null): boolean {
    return user ? project.roles[user.id] === 'owner' : false;
  }

  public async updateFollowingStatus(user: UserWithID | null) {
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

  public openComments(project: ReadProject): void {
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
