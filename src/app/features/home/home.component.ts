import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NgClass, NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { appInformation } from '../../information';
import {
  TopAppBarService,
} from '../../shared/components/top-app-bar/top-app-bar.service';
import { navPath } from '../../app.routes';
import { SeoService } from '../../shared/services/seo.service';
import { ProjectsService } from '../../shared/services/projects.service';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  MarqueeComponent,
} from '../../shared/components/marquee/marquee.component';
import {
  SkeletonComponent,
} from '../../shared/components/skeleton/skeleton.component';
import {
  FadeInOutAnimation,
} from '../../shared/animations/fade-in-out.animations';
import {
  CarouselComponent,
} from '../../shared/components/carousel/carousel.component';
import { tap } from 'rxjs/operators';
import { CarouselItem } from '../../shared/interfaces/carousel';
import {
  generateRandomNumber,
} from '../../shared/utils/generate-random-number';

@Component({
  selector: 'aj-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  animations: [FadeInOutAnimation],
  imports: [
    MatIconModule, MatButtonModule,
    NgOptimizedImage, RouterLink,
    MarqueeComponent, NgClass,
    NgTemplateOutlet, SkeletonComponent, CarouselComponent,
  ],
})
export class HomeComponent {
  readonly title = appInformation.title;
  protected readonly navPath = navPath;
  readonly nav_path = navPath;
  readonly heroTitle = 'Heyooo, I\'m Aaron';
  readonly heroSubtitle = appInformation.description;
  readonly contactEmail = appInformation.altEmail;
  readonly location = appInformation.location;
  featuredProjects = toSignal(
    this.projectsService.featuredProjects$.pipe(
      tap(() => this.featuredProjectsLoaded.set(true)),
    ),
  );
  featuredProjectsLoaded = signal(false);
  featuredProjectsCarouselItems = computed<CarouselItem[]>(() => {
    return this.featuredProjects()?.map((project) => ({
      id: project.id,
      name: project.name,
      image: project.image || '',
      routerLink: [navPath.projectDetail(project.id)],
    })) || [];
  });

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

  protected readonly generateRandomNumber = generateRandomNumber;
}
