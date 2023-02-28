import { Component } from '@angular/core';
import { TitleService } from "../../../core/services/title.service";
import { appInformation } from "../../../information";
import { SeoService } from "../../../core/services/seo.service";
import { nav_path } from "../../../app-routing.module";

@Component({
  selector: 'aj-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  private readonly title = appInformation.title;
  constructor(
    private titleService: TitleService,
    private seo: SeoService,
  ) {
    titleService.setTitle(this.title);
    seo.generateTags({
      title: this.title,
      route: nav_path.about,
    });
  }

}
