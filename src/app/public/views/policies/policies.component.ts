import { Component, Inject } from '@angular/core';
import { nav_path } from "../../../app-routing.module";
import { ActivatedRoute } from "@angular/router";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: 'bhb-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss']
})
export class PoliciesComponent {
  public readonly nav_path = nav_path;
  public policies = [
    { name: 'Terms of Use', icon: 'policy', routerLink: [nav_path.termsOfUse] },
    { name: 'Privacy Policy', icon: 'security', routerLink: [nav_path.privacyPolicy] },
  ];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private route: ActivatedRoute
  ) {
    route.fragment.forEach(fragment => this.document.querySelector(`#${fragment}`)?.scrollIntoView());
  }
}
