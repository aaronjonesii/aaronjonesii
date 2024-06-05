import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe, NgClass, NgOptimizedImage } from '@angular/common';
import { appInformation } from '../../information';
import {
  TopAppBarService,
} from '../../shared/components/top-app-bar/top-app-bar.service';
import { navPath } from '../../app.routes';
import { SeoService } from '../../shared/services/seo.service';
import { StrengthsService } from '../../shared/services/strengths.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import {
  SkeletonComponent,
} from '../../shared/components/skeleton/skeleton.component';
import {
  FadeInOutAnimation,
} from '../../shared/animations/fade-in-out.animations';
import { SkillsService } from '../../shared/services/skills.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'aj-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgClass,
    AsyncPipe,
    MatIconModule,
    MatButtonModule,
    NgOptimizedImage,
    SkeletonComponent,
  ],
  animations: [FadeInOutAnimation],
})
export class AboutComponent {
  private readonly title = appInformation.title;
  readonly strengths$ = this.strengthsService.strengths$;
  skills = toSignal(this.skillsService.getSkills$());

  constructor(
    private router: Router,
    private seoService: SeoService,
    private skillsService: SkillsService,
    private strengthsService: StrengthsService,
    private topAppBarService: TopAppBarService,
  ) {
    this.topAppBarService.setOptions({
      title: this.title,
      showBackBtn: false,
      loading: false,
    });

    this.seoService.generateTags({ route: navPath.about });
  }
}
