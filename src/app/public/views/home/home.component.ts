import { Component } from '@angular/core';
import { catchError, Observable, throwError } from "rxjs";
import { Project } from "../../../shared/interfaces/project";
import { FirestoreService } from "../../../shared/services/firestore.service";
import { where } from "@angular/fire/firestore";
import { ConsoleLoggerService } from "../../../core/services/console-logger.service";

@Component({
  selector: 'aj-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent {
  public readonly title = "Home page";
  public featuredProjects$?: Observable<Project[]>;

  constructor(
    private db: FirestoreService,
    private cLog: ConsoleLoggerService,
  ) {
    (this.featuredProjects$ = db.colQuery$(
      `projects`,
      {idField: 'id'},
      /** only get featured projects */
      where('featured', '==', true),
      /** filter out drafts */
      where('status', '!=', 'draft'),
      /** filter out private projects */
      where('visibility', '==', 'public'),
    ) as Observable<Project[]>).pipe(
      catchError(error => {
        cLog.error(`Something went wring loading featured projects`, error);
        return throwError(error);
      }),
    );
  }
}
