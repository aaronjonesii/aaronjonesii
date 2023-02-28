import { Component, Inject } from '@angular/core';
import { nav_path } from "../../../app-routing.module";
import { ActivatedRoute } from "@angular/router";
import { DOCUMENT } from "@angular/common";
import { TopAppBarService } from "../../../shared/components/top-app-bar/top-app-bar.service";
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
    private topAppBarService: TopAppBarService,
    private seoService: SeoService,
  ) {
    topAppBarService.setOptions({
      title: this.title,
      showBackBtn: false,
      loading: false,
    });
    seoService.generateTags({
      title: this.title,
      route: nav_path.home,
    });
    route.fragment.forEach(fragment => this.document.querySelector(`#${fragment}`)?.scrollIntoView());
  }
}
