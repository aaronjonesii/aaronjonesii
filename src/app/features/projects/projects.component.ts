import {
  ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy,
  Component, signal,
} from '@angular/core';
import {
  BehaviorSubject, Subscription,
  catchError, switchMap, of,
} from 'rxjs';
import {
  AsyncPipe, KeyValue, KeyValuePipe, LowerCasePipe, NgOptimizedImage,
} from '@angular/common';
import { MatChipListboxChange, MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReadProject } from '../../shared/interfaces/project';
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
import {
  SkeletonComponent,
} from '../../shared/components/skeleton/skeleton.component';
import { ProjectsFilter } from '../../shared/enums/projects-filter';
import { ProjectsService } from '../../shared/services/projects.service';

@Component({
  selector: 'aj-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    KeyValuePipe,
    MatIconModule,
    MatCardModule,
    LowerCasePipe,
    MatChipsModule,
    MatButtonModule,
    NgOptimizedImage,
    MatDividerModule,
    SkeletonComponent,
    LoadingOrErrorComponent,
  ],
  animations: [...ProjectsAnimations],
})
export class ProjectsComponent implements OnDestroy {
  private readonly title = 'Projects';
  readonly nav_path = navPath;
  private filterSubject =
    new BehaviorSubject<ProjectsFilter>(ProjectsFilter.ACTIVE);
  filter$ = this.filterSubject.asObservable();
  private projectsSignal = signal<ReadProject[]>([]);
  projects = this.projectsSignal.asReadonly();
  private subscriptions = new Subscription();
  private loadedSignal = signal(false);
  loaded = this.loadedSignal.asReadonly();
  private errorSignal = signal<FirebaseError | undefined>(undefined);
  error = this.errorSignal.asReadonly();
  readonly placeholders = Array(4).fill(() => '');
  protected readonly ProjectsFilter = ProjectsFilter;

  constructor(
    private seoService: SeoService,
    private cdRef: ChangeDetectorRef,
    private logger: ConsoleLoggerService,
    private projectsService: ProjectsService,
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
      switchMap((filter) => {
        return this.projectsService.getFilteredProjects$(filter).pipe(
          catchError((error: FirebaseError) => {
            this.logger.error(`Something went wrong loading projects`, error);
            this.errorSignal.set(error);
            return of([]);
          })
        );
      }),
    );
    this.subscriptions.add(
      projects$.subscribe((projects) => {
        this.projectsSignal.set(projects);
        this.loadedSignal.set(true);
        this.cdRef.markForCheck();
      }),
    );
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  keepSameOrder(
    k: KeyValue<unknown, unknown>,
    v: KeyValue<unknown, unknown>,
  ) {
    return 1;
  }
  /* eslint-enable @typescript-eslint/no-unused-vars */

  onFilterChange(event: MatChipListboxChange) {
    this.filterSubject.next(event.value);
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
