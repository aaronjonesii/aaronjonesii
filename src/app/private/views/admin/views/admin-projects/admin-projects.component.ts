import { Component } from '@angular/core';
import { catchError, Observable, throwError } from "rxjs";
import { Project } from "../../../../../shared/interfaces/project";
import { FirestoreService } from "../../../../../shared/services/firestore.service";
import { ConsoleLoggerService } from "../../../../../core/services/console-logger.service";

@Component({
  selector: 'aj-admin-projects',
  templateUrl: './admin-projects.component.html',
  styleUrls: ['./admin-projects.component.scss']
})
export class AdminProjectsComponent {
  public readonly title = 'Projects';
  public projects$: Observable<Project[]>;

  constructor(
    private db: FirestoreService,
    private cLog: ConsoleLoggerService
  ) {
    this.projects$ = (db.col$(`projects`, {idField: 'id'}) as Observable<Project[]>)
      .pipe(catchError(error => {
        this.cLog.error(`Something went wrong loading projects`, error);
        return throwError(error);
      }));
  }
}
