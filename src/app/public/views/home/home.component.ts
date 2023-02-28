import { Component } from '@angular/core';
import { catchError, Observable, throwError } from "rxjs";
import { Project, ProjectStatus, ProjectVisibility } from "../../../shared/interfaces/project";
import { FirestoreService } from "../../../shared/services/firestore.service";
import { where } from "@angular/fire/firestore";
import { ConsoleLoggerService } from "../../../core/services/console-logger.service";
import { nav_path } from "../../../app-routing.module";
import { TitleService } from "../../../core/services/title.service";
import { appInformation } from "../../../information";
import { SeoService } from "../../../core/services/seo.service";

@Component({
  selector: 'aj-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent {
  public readonly title = appInformation.title;
  public readonly nav_path = nav_path;
  public featuredProjects$?: Observable<Project[]>;

  constructor(
    private db: FirestoreService,
    private cLog: ConsoleLoggerService,
    private titleService: TitleService,
    private seo: SeoService,
  ) {
    titleService.setTitle(this.title);
    seo.generateTags({
      title: this.title,
      route: nav_path.home,
    });

    (this.featuredProjects$ = db.colQuery$(
      `projects`,
      {idField: 'id'},
      /** only get featured projects */
      where('featured', '==', true),
      /** filter out drafts */
      where('status', '!=', ProjectStatus.DRAFT),
      /** filter out private projects */
      where('visibility', '==', ProjectVisibility.PUBLIC),
    ) as Observable<Project[]>).pipe(
      catchError(error => {
        cLog.error(`Something went wring loading featured projects`, error);
        return throwError(error);
      }),
    );
  }
}
