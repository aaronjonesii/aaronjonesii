import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
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

@Component({
  selector: 'aj-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  standalone: true,
  imports: [NgOptimizedImage],
  animations: [
    SlideInFromRightAnimation,
    SlideInFromBottomAnimation,
  ],
})
export class AboutComponent {
  private readonly title = appInformation.title;

  constructor(
    private seoService: SeoService,
    private topAppBarService: TopAppBarService,
  ) {
    this.topAppBarService.setOptions({
      title: this.title,
      showBackBtn: false,
      loading: false,
    });

    this.seoService.generateTags({
      route: navPath.about,
    });
  }
}
