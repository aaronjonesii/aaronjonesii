import { Component } from '@angular/core';
import { map, Observable, of, switchMap } from "rxjs";
import { ReadProject } from "../../../../shared/interfaces/project";
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

@Component({
  selector: 'aj-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent {
  public readonly nav_path = nav_path;
  public projectID$?: Observable<string | null>;
  public project$?: Observable<ReadProject | null>;
  public user$ = this.auth.loadUser.pipe(
    switchMap(user => {
      if (user) return this.getUser$(user);
      else return of(user);
    }),
  );

  constructor(
    private route: ActivatedRoute,
    private db: FirestoreService,
    private auth: AuthService,
    private cLog: ConsoleLoggerService,
    private router: Router,
    private dialog: MatDialog,
  ) {
    this.projectID$ = route.paramMap.pipe(
      map((params) => params.get('projectID')),
    );

    this.project$ = this.projectID$.pipe(
      switchMap((projectID) => this.getProject(projectID)),
    );
  }

  public getUser$(user: User) {
    return (this.db.doc$(`users/${user.uid}`) as Observable<readUser>)
      .pipe(map(userDoc => (Object.assign({id: user.uid}, userDoc) as UserWithID)));
  }

  private getProject(id: string | null): Observable<ReadProject | null> {
    return (this.db.doc$(`projects/${id}`) as Observable<ReadProject>)
      .pipe(map(project => project ?? null));
  }

  public isOwner(project: ReadProject, user: UserWithID | null): boolean {
    return user ? project.roles[user.id] === 'owner' : false;
  }

  private _assertUser(user: UserWithID | null): asserts user {
    if (!user) {
      this.router.navigate([nav_path.signIn], { queryParams: { "redirectURL": this.router.routerState.snapshot.url } })
        .then(() => this.cLog.log(`You must be signed in`));
    }
  }

  public async updateFollowingStatus(user: UserWithID | null) {
    this._assertUser(user);

    async function update(db: FirestoreService, user: UserWithID, cLog: ConsoleLoggerService): Promise<void> {
      await db.update(`users/${user.id}`, { following: !user?.following ?? false })
        .then(() => cLog.log(user?.following ? 'Unfollowed' : 'Followed'));
    }

    if (user?.following) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        id: 'confirm-unfollow-dialog',
        data: {
          description: `Unfollow from ${appInformation.name}`,
          buttonText: `Unfollow`,
        }
      });

      dialogRef.afterClosed()
        .forEach(async confirm => confirm ? await update(this.db, user, this.cLog) : undefined);
    } else await update(this.db, user, this.cLog);
  }
}
