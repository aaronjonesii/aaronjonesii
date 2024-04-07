import { Component, Inject } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, switchMap, throwError } from "rxjs";
import { QueryConstraint, where } from "@angular/fire/firestore";
import { nav_path } from 'src/app/app-routing.module';
import { AsyncPipe, DOCUMENT, NgOptimizedImage } from "@angular/common";
import { MatChipsModule } from "@angular/material/chips";
import { MatCardModule } from "@angular/material/card";
import { RouterLink } from "@angular/router";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { ProjectStatus, ProjectVisibility, ReadProject } from "../../shared/interfaces/project";
import { FirestoreService } from "../../shared/services/firestore.service";
import { ConsoleLoggerService } from "../../core/services/console-logger.service";
import { TopAppBarService } from "../../shared/components/top-app-bar/top-app-bar.service";
import { SeoService } from "../../core/services/seo.service";
import { appInformation } from "../../information";

@Component({
  selector: 'aj-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  standalone: true,
  imports: [
    MatChipsModule,
    AsyncPipe,
    MatCardModule,
    RouterLink,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    NgOptimizedImage,
  ],
})
export class ProjectsComponent {
  private readonly title = 'Projects';
  public readonly nav_path = nav_path;
  public filterSubject = new BehaviorSubject<'all' | 'active' | 'inactive'>('all');
  public filter$ = this.filterSubject.asObservable();
  public projects$?: Observable<ReadProject[]>;

  constructor(
    private db: FirestoreService,
    private cLog: ConsoleLoggerService,
    @Inject(DOCUMENT) private document: Document,
    private topAppBarService: TopAppBarService,
    private seoService: SeoService,

  ) {
    this.topAppBarService.setOptions({
      title: this.title,
      showBackBtn: false,
      loading: false,
    });
    this.seoService.generateTags({
      title: this.title,
      route: nav_path.projects,
    });

    this.projects$ = this.filter$.pipe(
      switchMap(filter => {
        return this.getProjects$(filter);
      }),
    );
  }

  private getProjects$(filter: 'all' | 'active' | 'inactive'): Observable<ReadProject[]> {
    const queryConstraints: QueryConstraint[] = [
      /** filter out private projects */
      where('visibility', '==', ProjectVisibility.PUBLIC),
    ];

    switch (filter) {
      case "all":
        /** filter out drafts */
        queryConstraints.push(where('status', '!=', ProjectStatus.DRAFT))
        break;
      case "active":
        /** only show published projects */
        queryConstraints.push(where('status', '==', ProjectStatus.PUBLISHED))
        break;
      case "inactive":
        /** only show archived projects */
        queryConstraints.push(where('status', '==', ProjectStatus.ARCHIVED))
        break;
      default:
        this.cLog.warn(`Something went wrong filtering projects`, filter);
        break;
    }

    return (this.db.colQuery$(
      `projects`,
      {idField: 'id'},
        ...queryConstraints,
    ) as Observable<ReadProject[]>).pipe(
      /** sort by featured projects */
      map(projects => projects.sort((a, b) => b.featured.toString().localeCompare(a.featured.toString()))),
      catchError(error => {
        this.cLog.error(`Something went wrong loading projects`, error);
        return throwError(error);
      })
    );
  }

  public async onShare(project: ReadProject) {
    const host = `https://${appInformation.website}`;
    const path = `${nav_path.projects}/${project.slug}`;
    const url = host + path;
    const title = project.name;
    const text = project.description;

    // Feature detection to see if the Web Share API is supported.
    if ('share' in navigator) {
      return await navigator.share({
        url,
        text,
        title,
      }).catch(error => this.cLog.error(`Something went wrong sharing project`, error));
    }

    // Fallback to use Twitter's Web Intent URL.
    // (https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/guides/web-intent)
    const shareURL = new URL('https://twitter.com/intent/tweet');
    const params = new URLSearchParams();
    params.append('text', text);
    params.append('title', title);
    params.append('url', url);
    shareURL.search = params.toString();
    window.open(shareURL, '_blank', 'popup,noreferrer,noopener');
  }
}