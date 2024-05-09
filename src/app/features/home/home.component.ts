import { Component, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { NgOptimizedImage } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { appInformation } from '../../information';
import {
  ProjectWithID,
} from '../../shared/interfaces/project';
import {
  TopAppBarService,
} from '../../shared/components/top-app-bar/top-app-bar.service';
import { navPath } from '../../app.routes';
import { SeoService } from '../../shared/services/seo.service';
import { HomeAnimations } from './home.animations';
import { ProjectsService } from '../../shared/services/projects.service';

@Component({
  selector: 'aj-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  animations: [...HomeAnimations],
  imports: [MatIconModule, MatButtonModule, NgOptimizedImage],
})
export class HomeComponent {
  readonly title = appInformation.title;
  readonly nav_path = navPath;
  featuredProjects$?: Observable<ProjectWithID[] | null>;
  readonly heroTitle = 'Heyooo, I\'m Aaron, a Full Stack Engineer';
  readonly heroSubtitle = appInformation.description;
  readonly contactEmail = appInformation.altEmail;
  readonly location = appInformation.location;
  private titleAnimationDoneSignal = signal(false);
  titleAnimationDone = this.titleAnimationDoneSignal.asReadonly();

  constructor(
    private seoService: SeoService,
    private projectsService: ProjectsService,
    private topAppBarService: TopAppBarService,
  ) {
    this.topAppBarService.setOptions({
      title: this.title,
      showBackBtn: false,
      loading: false,
    });
    this.seoService.generateTags({ route: navPath.home });

    this.featuredProjects$ = this.projectsService.featuredProjects$;
  }

  onTitleAnimationDone() {
    this.titleAnimationDoneSignal.set(true);
  }
}
