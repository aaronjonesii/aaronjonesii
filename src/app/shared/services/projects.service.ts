import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import {
  Project,
  ProjectStatus,
  ProjectVisibility,
} from '../interfaces/project';
import { where } from '@angular/fire/firestore';
import { catchError, Observable, of } from 'rxjs';
import { FirebaseError } from '@angular/fire/app/firebase';
import { ConsoleLoggerService } from './console-logger.service';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  constructor(
    private db: FirestoreService,
    private logger: ConsoleLoggerService,
  ) {}

  /**
   * Retrieves an Observable stream of featured projects from Firestore.
   *
   * @remarks
   * Applies the following filters to the Firestore query:
   *   - `featured`: true - Only retrieves projects marked as featured.
   *   - `status`: not equal to 'DRAFT' - Excludes projects in draft status.
   *   - `visibility`: 'PUBLIC' - Ensures only publicly visible projects are
   *   returned.
   *
   * Includes error handling to gracefully handle Firestore errors and ensure
   * an empty array is emitted on failure.
   *
   * @return {Observable<Project[]>} An Observable emitting an array of
   * featured projects, or an empty array if an error occurs.
   */
  get featuredProjects$(): Observable<Project[]> {
    return this.db.colQuery$<Project>(
      `projects`,
      { idField: 'id' },
      where('featured', '==', true),
      where('status', '!=', ProjectStatus.DRAFT),
      where('visibility', '==', ProjectVisibility.PUBLIC),
    ).pipe(
      catchError((error: FirebaseError) => {
        this.logger.error(
          `Error loading featured projects`, error,
        );
        return of([]);
      }),
    );
  }
}
