import { Component } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { where } from '@angular/fire/firestore';
import { MatButtonModule } from '@angular/material/button';
import { NgOptimizedImage } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { appInformation } from '../../information';
import {
  Project, ProjectStatus, ProjectVisibility,
} from '../../shared/interfaces/project';
import { FirestoreService } from '../../shared/services/firestore.service';
import {
  TopAppBarService,
} from '../../shared/components/top-app-bar/top-app-bar.service';
import { navPath } from '../../app.routes';
import {
  ConsoleLoggerService,
} from '../../shared/services/console-logger.service';
import { SeoService } from '../../shared/services/seo.service';
import { FirebaseError } from '@angular/fire/app/firebase';
import {
  SlideInFromBottomAnimation,
} from '../../shared/animations/slide-in-from-bottom.animations';
import {
  SlideInFromLeftAnimation,
} from '../../shared/animations/slide-in-from-left.animations';

@Component({
  selector: 'aj-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    NgOptimizedImage,
  ],
  animations: [
    SlideInFromBottomAnimation,
    SlideInFromLeftAnimation,
  ],
})
export class HomeComponent {
  readonly title = appInformation.title;
  readonly nav_path = navPath;
  featuredProjects$?: Observable<Project[] | null>;
  readonly heroTitle = 'Heyooo, I\'m Aaron, a Full Stack Engineer';
  readonly heroSubtitle = appInformation.description;
  readonly contactEmail = appInformation.email;
  readonly location = appInformation.location;

  constructor(
    private db: FirestoreService,
    private seoService: SeoService,
    private logger: ConsoleLoggerService,
    private topAppBarService: TopAppBarService,
  ) {
    this.topAppBarService.setOptions({
      title: this.title,
      showBackBtn: false,
      loading: false,
    });
    this.seoService.generateTags({
      route: navPath.home,
    });

    this.featuredProjects$ = this.db.colQuery$<Project>(
      `projects`,
      { idField: 'id' },
      /** only get featured projects */
      where('featured', '==', true),
      /** filter out drafts */
      where('status', '!=', ProjectStatus.DRAFT),
      /** filter out private projects */
      where('visibility', '==', ProjectVisibility.PUBLIC),
    ).pipe(
      catchError((error: FirebaseError) => {
        this.logger.error(
          `Something went wrong loading featured projects`, error,
        );
        return of(null);
      }),
    );
  }
}
