import { Component } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";
import { appInformation } from "../../information";
import { TopAppBarService } from "../../shared/components/top-app-bar/top-app-bar.service";
import { nav_path } from "../../app.routes";
import { SeoService } from "../../shared/services/seo.service";

@Component({
  selector: 'aj-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  standalone: true,
  imports: [NgOptimizedImage],
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
      route: nav_path.about,
    });
  }
}
