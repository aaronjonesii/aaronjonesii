import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy, signal,
} from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable, of,
  Subscription,
  switchMap,
} from 'rxjs';
import { QueryConstraint, where } from '@angular/fire/firestore';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { MatChipListboxChange, MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  ProjectStatus,
  ProjectVisibility,
  ReadProject,
} from '../../shared/interfaces/project';
import { FirestoreService } from '../../shared/services/firestore.service';
import {
  TopAppBarService,
} from '../../shared/components/top-app-bar/top-app-bar.service';
import { appInformation } from '../../information';
import { navPath } from '../../app.routes';
import {
  ConsoleLoggerService,
} from '../../shared/services/console-logger.service';
import { SeoService } from '../../shared/services/seo.service';
import { ProjectsAnimations } from './animations/projects.animations';
import {
  LoadingOrErrorComponent,
} from '../../shared/components/loading-or-error/loading-or-error.component';
import { FirebaseError } from '@angular/fire/app/firebase';

@Component({
  selector: 'aj-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    NgOptimizedImage,
    MatDividerModule,
    LoadingOrErrorComponent,
  ],
  animations: [...ProjectsAnimations],
})
export class ProjectsComponent implements OnDestroy {
  private readonly title = 'Projects';
  readonly nav_path = navPath;
  private filterSubject =
    new BehaviorSubject<'all' | 'active' | 'inactive'>('active');
  filter$ = this.filterSubject.asObservable();
  private projectsSignal = signal<ReadProject[]>([]);
  projects = this.projectsSignal.asReadonly();
  private subscriptions = new Subscription();
  private loadedSignal = signal(false);
  loaded = this.loadedSignal.asReadonly();
  private errorSignal = signal<FirebaseError | undefined>(undefined);
  error = this.errorSignal.asReadonly();

  constructor(
    private db: FirestoreService,
    private seoService: SeoService,
    private cdRef: ChangeDetectorRef,
    private logger: ConsoleLoggerService,
    private topAppBarService: TopAppBarService,
  ) {
    this.topAppBarService.setOptions({
      title: this.title,
      showBackBtn: false,
      loading: false,
    });
    this.seoService.generateTags({
      title: this.title,
      route: navPath.projects,
    });

    const projects$ = this.filter$.pipe(
      switchMap((filter) => this.getProjects$(filter)),
    );
    this.subscriptions.add(
      projects$.subscribe((projects) => {
        this.projectsSignal.set(projects);
        this.loadedSignal.set(true);
        this.cdRef.markForCheck();
      }),
    );
  }

  onFilterChange(event: MatChipListboxChange) {
    this.filterSubject.next(event.value);
  }

  private getProjects$(
    filter: 'all' | 'active' | 'inactive',
  ): Observable<ReadProject[]> {
    const queryConstraints: QueryConstraint[] = [
      /** filter out private projects */
      where('visibility', '==', ProjectVisibility.PUBLIC),
    ];

    switch (filter) {
      case 'all':
        /** filter out drafts */
        queryConstraints.push(where('status', '!=', ProjectStatus.DRAFT));
        break;
      case 'active':
        /** only show published projects */
        queryConstraints.push(where('status', '==', ProjectStatus.PUBLISHED));
        break;
      case 'inactive':
        /** only show archived projects */
        queryConstraints.push(where('status', '==', ProjectStatus.ARCHIVED));
        break;
      default:
        this.logger.warn(`Something went wrong filtering projects`, filter);
        break;
    }

    return (this.db.colQuery$<ReadProject>(
      `projects`,
      { idField: 'id' },
        ...queryConstraints,
    )).pipe(
      /** sort by featured projects */
      map((projects) => projects.sort((a, b) => {
        return b.featured.toString().localeCompare(a.featured.toString());
      })),
      catchError((error: FirebaseError) => {
        this.logger.error(`Something went wrong loading projects`, error);
        this.errorSignal.set(error);
        return of([]);
      })
    );
  }

  async onShare(project: ReadProject) {
    const host = `https://${appInformation.website}`;
    const path = `${navPath.projects}/${project.slug}`;
    const url = host + path;
    const title = project.name;
    const text = project.description;

    try {
      // Feature detection to see if the Web Share API is supported.
      if ('share' in navigator) {
        return await navigator.share({
          url,
          text,
          title,
        });
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
    } catch (error: unknown) {
      this.logger.error('Error sharing project', error);
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
