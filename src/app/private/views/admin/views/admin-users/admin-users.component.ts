import { Component } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FirebaseError } from '@angular/fire/app/firebase';
import { readUser } from "../../../../../shared/interfaces/user";
import { nav_path } from 'src/app/app-routing.module';
import { FirestoreService } from "../../../../../shared/services/firestore.service";

@Component({
  selector: 'aj-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent {
  public readonly title = 'Customers';
  public readonly nav_path = nav_path;
  public users$?: Observable<readUser[]>;
  public error?: FirebaseError;

  constructor(private db: FirestoreService) {
    this.users$ = (this.db.col$(`users`, { idField: 'id' }) as Observable<readUser[]>)
      .pipe(catchError((error: FirebaseError) => {
        console.error(`Something went wrong loading users`, error.message)
        this.error = error;
        return throwError(error);
      }))
  }

}
