import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NgOptimizedImage } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { appInformation } from '../../information';
import {
  TopAppBarService,
} from '../../shared/components/top-app-bar/top-app-bar.service';
import { navPath } from '../../app.routes';
import { SeoService } from '../../shared/services/seo.service';
import { HomeAnimations } from './home.animations';
import { ProjectsService } from '../../shared/services/projects.service';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  MarqueeComponent,
} from '../../shared/components/marquee/marquee.component';

@Component({
  selector: 'aj-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  animations: [...HomeAnimations],
  imports: [
    MatIconModule, MatButtonModule,
    NgOptimizedImage, RouterLink,
    MarqueeComponent,
  ],
})
export class HomeComponent {
  readonly title = appInformation.title;
  readonly nav_path = navPath;
  readonly heroTitle = 'Heyooo, I\'m Aaron';
  readonly heroSubtitle = appInformation.description;
  readonly contactEmail = appInformation.altEmail;
  readonly location = appInformation.location;
  private titleAnimationDoneSignal = signal(false);
  titleAnimationDone = this.titleAnimationDoneSignal.asReadonly();
  featuredProjects = toSignal(this.projectsService.featuredProjects$);
  scrollImages = signal([
    {
      id: 'angular',
      alt: 'Angular gradient color logo',
      src: 'assets/imgs/angular_gradient.webp',
      height: '1920',
      width: '1920',
    },
    {
      id: 'firebase',
      alt: 'Firebase full color logo',
      src: 'assets/imgs/firebase_logomark_full_color.webp',
      height: '600',
      width: '600',
    },
    {
      id: 'google-cloud',
      alt: 'Google Cloud full color logo',
      src: 'assets/imgs/google_cloud_full_color_rgb_544x96px.webp',
      height: '96',
      width: '544',
    },
  ]);

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
  }

  onTitleAnimationDone() {
    this.titleAnimationDoneSignal.set(true);
  }
}
