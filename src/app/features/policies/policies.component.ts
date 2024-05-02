import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { appInformation } from '../../information';
import { navPath } from '../../app.routes';
import {
  TopAppBarService,
} from '../../shared/components/top-app-bar/top-app-bar.service';
import { SeoService } from '../../shared/services/seo.service';
import { RoutingService } from '../../shared/services/routing.service';
import { GenericItem } from '../../shared/interfaces/generic-item';

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
  readonly nav_path = navPath;
  protected readonly website = appInformation.website;
  policies: GenericItem[] = [
    {
      id: 'terms-of-use',
      name: 'Terms of Use',
      icon: 'policy',
      routerLink: [navPath.termsOfUse],
    },
    {
      id: 'privacy-policy',
      name: 'Privacy Policy',
      icon: 'security', routerLink: [navPath.privacyPolicy],
    },
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
      route: navPath.home,
    });

    this.routing.watchAndRouteToFragment();
  }
}
