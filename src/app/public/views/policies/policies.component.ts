import { Component, Inject } from '@angular/core';
import { nav_path } from "../../../app-routing.module";
import { ActivatedRoute } from "@angular/router";
import { DOCUMENT } from "@angular/common";
import { TitleService } from "../../../core/services/title.service";
import { SeoService } from "../../../core/services/seo.service";

@Component({
  selector: 'aj-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss']
})
export class PoliciesComponent {
  private readonly title = 'Policies';
  public readonly nav_path = nav_path;
  public policies = [
    { name: 'Terms of Use', icon: 'policy', routerLink: [nav_path.termsOfUse] },
    { name: 'Privacy Policy', icon: 'security', routerLink: [nav_path.privacyPolicy] },
  ];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private route: ActivatedRoute,
    private titleService: TitleService,
    private seo: SeoService,
  ) {
    titleService.setTitle(this.title);
    seo.generateTags({
      title: this.title,
      route: nav_path.home,
    });
    route.fragment.forEach(fragment => this.document.querySelector(`#${fragment}`)?.scrollIntoView());
  }
}
