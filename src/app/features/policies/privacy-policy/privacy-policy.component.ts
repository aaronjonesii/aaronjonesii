import { Component } from '@angular/core';
import { DatePipe } from "@angular/common";
import { MatDividerModule } from "@angular/material/divider";
import { TopAppBarService } from "../../../shared/components/top-app-bar/top-app-bar.service";
import { nav_path } from '../../../app.routes';
import { appInformation } from '../../../information';
import { SeoService } from "../../../shared/services/seo.service";
import { RoutingService } from "../../../shared/services/routing.service";

@Component({
  selector: 'aj-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  standalone: true,
  imports: [MatDividerModule, DatePipe],
})
export class PrivacyPolicyComponent {
  readonly nav_path = nav_path;
  readonly lastUpdated = new Date('02/09/2023');
  readonly title = 'Privacy Policy';
  appInformation = appInformation;

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
      description: `${this.title} page for ${appInformation.website}`,
      route: nav_path.privacyPolicy,
    });

    this.routing.watchAndRouteToFragment();
  }
}
