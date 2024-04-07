import { Component } from '@angular/core';
import { catchError, Observable, throwError } from "rxjs";
import { AdminProjectsGridComponent } from "../../shared/admin-projects-grid/admin-projects-grid.component";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { AsyncPipe } from "@angular/common";
import { TopAppBarComponent } from "../../../../shared/components/top-app-bar/top-app-bar.component";
import { nav_path } from 'src/app/app-routing.module';
import { ProjectWithID } from "../../../../shared/interfaces/project";
import { FirestoreService } from "../../../../shared/services/firestore.service";
import { ConsoleLoggerService } from "../../../../core/services/console-logger.service";

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
  ],
})
export class AdminProjectsComponent {
  readonly title = 'Projects';
  readonly nav_path = nav_path;
  projects$: Observable<ProjectWithID[]>;

  constructor(
    private db: FirestoreService,
    private cLog: ConsoleLoggerService,
  ) {
    this.projects$ = (this.db.col$(`projects`, {idField: 'id'}) as Observable<ProjectWithID[]>)
      .pipe(catchError(error => {
        this.cLog.error(`Something went wrong loading projects`, error);
        return throwError(error);
      }));
  }
}
