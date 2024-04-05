import { Component, Inject } from '@angular/core';
import { nav_path } from "../../../../app-routing.module";
import { DatePipe, DOCUMENT } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { appInformation } from "../../../../information";
import { SeoService } from "../../../../core/services/seo.service";
import { TopAppBarService } from "../../../../shared/components/top-app-bar/top-app-bar.service";
import { MatDividerModule } from "@angular/material/divider";

@Component({
  selector: 'aj-terms-of-use',
  templateUrl: './terms-of-use.component.html',
  styleUrl: './terms-of-use.component.scss',
  standalone: true,
  imports: [
    MatDividerModule,
    DatePipe,
  ],
})
export class TermsOfUseComponent {
  readonly nav_path = nav_path;
  readonly lastUpdated = new Date('02/09/2023');
  readonly title = 'Terms of Use';
  readonly appInformation = appInformation;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private route: ActivatedRoute,
    private seoService: SeoService,
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

    this.route.fragment.forEach(fragment => this.document.querySelector(`#${fragment}`)?.scrollIntoView());
  }
}
