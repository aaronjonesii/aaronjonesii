import { Component, Inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { DOCUMENT } from "@angular/common";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { appInformation } from "../../information";
import { nav_path } from "../../app-routing.module";
import { TopAppBarService } from "../../shared/components/top-app-bar/top-app-bar.service";
import { SeoService } from "../../core/services/seo.service";

@Component({
  selector: 'aj-policies',
  templateUrl: './policies.component.html',
  styleUrl: './policies.component.scss',
  standalone: true,
  imports: [
    MatListModule,
    RouterLink,
    MatIconModule,
  ],
})
export class PoliciesComponent {
  private readonly title = 'Policies';
  readonly nav_path = nav_path;
  protected readonly website = appInformation.website;
  policies = [
    { name: 'Terms of Use', icon: 'policy', routerLink: [nav_path.termsOfUse] },
    { name: 'Privacy Policy', icon: 'security', routerLink: [nav_path.privacyPolicy] },
  ];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private route: ActivatedRoute,
    private topAppBarService: TopAppBarService,
    private seoService: SeoService,
  ) {
    this.topAppBarService.setOptions({
      title: this.title,
      showBackBtn: false,
      loading: false,
    });
    this.seoService.generateTags({
      title: this.title,
      route: nav_path.home,
    });
    this.route.fragment.forEach(fragment => this.document.querySelector(`#${fragment}`)?.scrollIntoView());
  }
}
