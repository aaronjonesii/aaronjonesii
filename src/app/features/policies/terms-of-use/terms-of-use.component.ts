import { Component } from '@angular/core';
import { DatePipe } from "@angular/common";
import { MatDividerModule } from "@angular/material/divider";
import { nav_path } from "../../../app.routes";
import { appInformation } from "../../../information";
import { TopAppBarService } from "../../../shared/components/top-app-bar/top-app-bar.service";
import { SeoService } from "../../../shared/services/seo.service";
import { RoutingService } from "../../../shared/services/routing.service";

@Component({
  selector: 'aj-terms-of-use',
  templateUrl: './terms-of-use.component.html',
  standalone: true,
  imports: [MatDividerModule, DatePipe],
})
export class TermsOfUseComponent {
  readonly nav_path = nav_path;
  readonly lastUpdated = new Date('02/09/2023');
  readonly title = 'Terms of Use';
  readonly appInformation = appInformation;

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
      description: `${this.title} policy page for ${appInformation.website}`,
      route: nav_path.termsOfUse,
    });

    this.routing.watchAndRouteToFragment();
  }
}
