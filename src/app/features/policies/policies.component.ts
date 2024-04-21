import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { appInformation } from "../../information";
import { nav_path } from "../../app.routes";
import { TopAppBarService } from "../../shared/components/top-app-bar/top-app-bar.service";
import { SeoService } from "../../shared/services/seo.service";
import { RoutingService } from "../../shared/services/routing.service";

@Component({
  selector: 'aj-policies',
  templateUrl: './policies.component.html',
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
    private seoService: SeoService,
    private routing: RoutingService,
    private topAppBarService: TopAppBarService,
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

    this.routing.watchAndRouteToFragment();
  }
}
