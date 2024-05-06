import { Component } from '@angular/core';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { appInformation } from '../../information';
import {
  TopAppBarService,
} from '../../shared/components/top-app-bar/top-app-bar.service';
import { navPath } from '../../app.routes';
import { SeoService } from '../../shared/services/seo.service';
import {
  SlideInFromRightAnimation,
} from '../../shared/animations/slide-in-from-right.animations';
import {
  SlideInFromBottomAnimation,
} from '../../shared/animations/slide-in-from-bottom.animations';
import { StrengthsService } from '../../shared/services/strengths.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  SlideInFromLeftAnimation,
} from '../../shared/animations/slide-in-from-left.animations';
import { Router } from '@angular/router';

@Component({
  selector: 'aj-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  standalone: true,
  imports: [
    AsyncPipe,
    MatIconModule,
    MatButtonModule,
    NgOptimizedImage,
  ],
  animations: [
    SlideInFromLeftAnimation,
    SlideInFromRightAnimation,
    SlideInFromBottomAnimation,
  ],
})
export class AboutComponent {
  private readonly title = appInformation.title;
  readonly strengths$ = this.strengthsService.strengths$;

  constructor(
    private router: Router,
    private seoService: SeoService,
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

  async onConnectBtnClick() {
    await this.router.navigate([navPath.contact]);
  }
}
