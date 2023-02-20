import { Component } from '@angular/core';
import { catchError, Observable, throwError } from "rxjs";
import { ProjectWithID } from "../../../../../shared/interfaces/project";
import { FirestoreService } from "../../../../../shared/services/firestore.service";
import { ConsoleLoggerService } from "../../../../../core/services/console-logger.service";
import { nav_path } from "../../../../../app-routing.module";

@Component({
  selector: 'aj-admin-projects',
  templateUrl: './admin-projects.component.html',
  styleUrls: ['./admin-projects.component.scss']
})
export class AdminProjectsComponent {
  public readonly title = 'Projects';
  public readonly nav_path = nav_path;
  public projects$: Observable<ProjectWithID[]>;

  constructor(
    private db: FirestoreService,
    private cLog: ConsoleLoggerService,
  ) {
    this.projects$ = (db.col$(`projects`, {idField: 'id'}) as Observable<ProjectWithID[]>)
      .pipe(catchError(error => {
        this.cLog.error(`Something went wrong loading projects`, error);
        return throwError(error);
      }));
  }
}
