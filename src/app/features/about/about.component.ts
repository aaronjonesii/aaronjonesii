import { Component } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";
import { appInformation } from "../../information";
import { TopAppBarService } from "../../shared/components/top-app-bar/top-app-bar.service";
import { SeoService } from "../../core/services/seo.service";
import { nav_path } from "../../app-routing.module";

@Component({
  selector: 'aj-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
})
export class AboutComponent {
  private readonly title = appInformation.title;
  constructor(
    private topAppBarService: TopAppBarService,
    private seoService: SeoService,
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