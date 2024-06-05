import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { AsyncPipe, NgClass, NgOptimizedImage } from '@angular/common';
import { appInformation } from '../../information';
import {
  TopAppBarService,
} from '../../shared/components/top-app-bar/top-app-bar.service';
import { navPath } from '../../app.routes';
import { SeoService } from '../../shared/services/seo.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  SkeletonComponent,
} from '../../shared/components/skeleton/skeleton.component';
import {
  FadeInOutAnimation,
} from '../../shared/animations/fade-in-out.animations';
import { SkillsService } from '../../shared/services/skills.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { HobbiesService } from '../../shared/services/hobbies.service';
import { ProjectsService } from '../../shared/services/projects.service';
import { ProjectsFilter } from '../../shared/enums/projects-filter';
import { RouterLink } from '@angular/router';
import { SocialsService } from '../../shared/services/socials.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'aj-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgClass,
    AsyncPipe,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    NgOptimizedImage,
    MatTooltipModule,
    SkeletonComponent,
  ],
  animations: [FadeInOutAnimation],
})
export class AboutComponent implements OnInit {
  private readonly title = appInformation.title;

  private seoService = inject(SeoService);
  private skillsService = inject(SkillsService);
  private topAppBarService = inject(TopAppBarService);
  private hobbiesService = inject(HobbiesService);
  private projectsService = inject(ProjectsService);
  private socialsService = inject(SocialsService);

  skills = toSignal(this.skillsService.getSkills$);
  hobbies = toSignal(this.hobbiesService.getHobbies$);
  projects =
    toSignal(this.projectsService.getFilteredProjects$(ProjectsFilter.ACTIVE));
  socials = toSignal(this.socialsService.getSocials$);

  ngOnInit() {
    this.topAppBarService.setOptions({
      title: this.title,
      showBackBtn: false,
      loading: false,
    });

    this.seoService.generateTags({ route: navPath.about });
  }

  protected readonly navPath = navPath;
}
