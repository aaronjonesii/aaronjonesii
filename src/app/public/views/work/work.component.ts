import { Component } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, switchMap, throwError } from "rxjs";
import { Project } from "../../../shared/interfaces/project";
import { FirestoreService } from "../../../shared/services/firestore.service";
import { ConsoleLoggerService } from "../../../core/services/console-logger.service";
import { QueryConstraint, where } from "@angular/fire/firestore";

@Component({
  selector: 'aj-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent {
  public filterSubject = new BehaviorSubject<'all' | 'active' | 'inactive'>('all');
  public filter$ = this.filterSubject.asObservable();
  public projects$?: Observable<Project[]>;

  constructor(
    private db: FirestoreService,
    private cLog: ConsoleLoggerService,
  ) {
    this.projects$ = this.filter$.pipe(
      switchMap(filter => {
        return this.getProjects$(filter);
      }),
    );
  }

  private getProjects$(filter: 'all' | 'active' | 'inactive'): Observable<Project[]> {
    const queryConstraints: QueryConstraint[] = [
      /** filter out private projects */
      where('visibility', '==', 'public'),
    ];

    switch (filter) {
      case "all":
        /** filter out drafts */
        queryConstraints.push(where('status', '!=', 'draft'))
        break;
      case "active":
        /** only show published projects */
        queryConstraints.push(where('status', '==', 'published'))
        break;
      case "inactive":
        /** only show archived projects */
        queryConstraints.push(where('status', '==', 'archived'))
        break;
      default:
        this.cLog.warn(`Something went wrong filtering projects`, filter);
        break;
    }

    return (this.db.colQuery$(
      `projects`,
      {idField: 'id'},
        ...queryConstraints,
    ) as Observable<Project[]>).pipe(
      /** sort by featured projects */
      map(projects => projects.sort((a, b) => b.featured.toString().localeCompare(a.featured.toString()))),
      catchError(error => {
        this.cLog.error(`Something went wrong loading projects`, error);
        return throwError(error);
      })
    );
  }
}