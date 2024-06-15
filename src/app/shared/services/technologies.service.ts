import { inject, Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { Technology } from '../interfaces/technology';
import { ConsoleLoggerService } from './console-logger.service';
import { catchError, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TechnologiesService {
  private db = inject(FirestoreService);
  private logger = inject(ConsoleLoggerService);

  private readonly collectionName = 'technologies';

  get getTechnologies$() {
    return this.db.col$<Technology>(this.collectionName).pipe(
      catchError((error: unknown) => {
        this.logger.error('Error handled getting technologies', error);
        return of(null);
      }),
    );
  }

  getTechnology$(id: string) {
    return this.db.doc$<Technology>(`${this.collectionName}/${id}`).pipe(
      catchError((error: unknown) => {
        this.logger.error(`Error handled getting technology: ${id}`, error);
        return of(null);
      }),
    );
  }

  createTechnology(item: Technology) {
    delete item.id;
    return this.db.add(this.collectionName, item).catch((error: unknown) => {
      this.logger.error('Error handled creating technology', error);
      return null;
    });
  }

  updateTechnology(id: string, item: Technology) {
    return this.db.update(`${this.collectionName}/${id}`, item)
      .catch((error: unknown) => {
        this.logger.error(`Error handled updating technology: ${id}`, error);
      });
  }

  deleteTechnology(id: string) {
    return this.db.delete(`${this.collectionName}/${id}`)
      .catch((error: unknown) => {
        this.logger.error(`Error handled deleting technology: ${id}`, error);
      });
  }
}
