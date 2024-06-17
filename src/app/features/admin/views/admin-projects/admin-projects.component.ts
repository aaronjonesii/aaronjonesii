import { Component, OnDestroy } from '@angular/core';
import { catchError, of, Subscription, switchMap } from 'rxjs';
import {
  AdminProjectsGridComponent,
} from '../../shared/admin-projects-grid/admin-projects-grid.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe } from '@angular/common';
import {
  TopAppBarComponent,
} from '../../../../shared/components/top-app-bar/top-app-bar.component';
import {
  ProjectWithID,
  ProjectWithTech,
} from '../../../../shared/interfaces/project';
import {
  FirestoreService,
} from '../../../../shared/services/firestore.service';
import { navPath } from '../../../../app.routes';
import {
  ConsoleLoggerService,
} from '../../../../shared/services/console-logger.service';
import { FirebaseError } from '@angular/fire/app/firebase';
import {
  LoadingOrErrorComponent,
// eslint-disable-next-line max-len
} from '../../../../shared/components/loading-or-error/loading-or-error.component';
import {
  TopAppBarService,
} from '../../../../shared/components/top-app-bar/top-app-bar.service';
import { ProjectsService } from '../../../../shared/services/projects.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'aj-admin-projects',
  templateUrl: './admin-projects.component.html',
  styleUrl: './admin-projects.component.scss',
  standalone: true,
  imports: [
    TopAppBarComponent,
    AsyncPipe,
    AdminProjectsGridComponent,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    LoadingOrErrorComponent,
  ],
})
export class AdminProjectsComponent implements OnDestroy {
  readonly title = 'Projects';
  readonly nav_path = navPath;
  projects?: ProjectWithTech[];
  error?: Error;
  private subscriptions = new Subscription();

  constructor(
    private db: FirestoreService,
    private logger: ConsoleLoggerService,
    private projectsService: ProjectsService,
    private topAppBarService: TopAppBarService,
  ) {
    this.topAppBarService.setOptions({
      title: `Admin ${this.title}`,
      loading: false,
      showBackBtn: true,
    });

    const projects$ = this.db.col$<ProjectWithID>(`projects`, { idField: 'id' })
      .pipe(
        switchMap((projects) => {
          const projectObservables = projects
            .map((p) => this.projectsService.projectWihTechnologies$(p));
          return combineLatest(projectObservables);
        }),
        catchError((error: FirebaseError) => {
          this.logger.error(`Error loading projects`, error);
          this.error = error;
          return of([]);
        })
      );

    this.subscriptions.add(
      projects$.subscribe((projects) => {
        this.projects = projects;
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
