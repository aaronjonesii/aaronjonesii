import { Component } from '@angular/core';
import { catchError, Observable, throwError } from "rxjs";
import { Project, ProjectStatus, ProjectVisibility } from "../../../shared/interfaces/project";
import { FirestoreService } from "../../../shared/services/firestore.service";
import { where } from "@angular/fire/firestore";
import { ConsoleLoggerService } from "../../../core/services/console-logger.service";
import { nav_path } from "../../../app-routing.module";
import { TopAppBarService } from "../../../shared/components/top-app-bar/top-app-bar.service";
import { appInformation } from "../../../information";
import { SeoService } from "../../../core/services/seo.service";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";
import { AsyncPipe, NgOptimizedImage } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'aj-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    RouterLink,
    AsyncPipe,
    MatIconModule,
    NgOptimizedImage,
  ],
})
export class HomeComponent {
  public readonly title = appInformation.title;
  public readonly nav_path = nav_path;
  public featuredProjects$?: Observable<Project[]>;

  constructor(
    private db: FirestoreService,
    private cLog: ConsoleLoggerService,
    private topAppBarService: TopAppBarService,
    private seoService: SeoService,
  ) {
    this.topAppBarService.setOptions({
      title: this.title,
      showBackBtn: false,
      loading: false,
    });
    this.seoService.generateTags({
      route: nav_path.home,
    });

    (this.featuredProjects$ = this.db.colQuery$(
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
        this.cLog.error(`Something went wring loading featured projects`, error);
        return throwError(error);
      }),
    );
  }
}
