import { Component, OnDestroy } from '@angular/core';
import { catchError, of, Subscription } from "rxjs";
import { AdminProjectsGridComponent } from "../../shared/admin-projects-grid/admin-projects-grid.component";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { AsyncPipe } from "@angular/common";
import { TopAppBarComponent } from "../../../../shared/components/top-app-bar/top-app-bar.component";
import { ProjectWithID } from "../../../../shared/interfaces/project";
import { FirestoreService } from "../../../../shared/services/firestore.service";
import { nav_path } from '../../../../app.routes';
import { ConsoleLoggerService } from "../../../../shared/services/console-logger.service";
import { FirebaseError } from "@angular/fire/app/firebase";
import { LoadingOrErrorComponent } from "../../../../shared/components/loading-or-error/loading-or-error.component";

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
  readonly nav_path = nav_path;
  projects?: ProjectWithID[];
  error?: Error;
  private subscriptions = new Subscription();

  constructor(
    private db: FirestoreService,
    private logger: ConsoleLoggerService,
  ) {
    const projects$ = this.db.col$<ProjectWithID>(`projects`, {idField: 'id'})
      .pipe(
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