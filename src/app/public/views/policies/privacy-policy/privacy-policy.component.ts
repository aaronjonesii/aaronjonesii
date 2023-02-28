import { Component, Inject } from '@angular/core';
import { nav_path } from 'src/app/app-routing.module';
import { DOCUMENT } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { appInformation } from "../../../../information";
import { SeoService } from "../../../../core/services/seo.service";
import { TitleService } from "../../../../core/services/title.service";

@Component({
  selector: 'aj-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent {
  public readonly nav_path = nav_path;
  public readonly lastUpdated = new Date('02/09/2023');
  public readonly title = 'Privacy Policy';
  public appInformation = appInformation;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private route: ActivatedRoute,
    private seo: SeoService,
    private titleService: TitleService,
  ) {
    titleService.setTitle(this.title);
    seo.generateTags({
      title: this.title,
      description: `${this.title} page for ${appInformation.website}`,
      route: nav_path.privacyPolicy,
    });
    route.fragment.forEach(fragment => this.document.querySelector(`#${fragment}`)?.scrollIntoView());
  }
}
