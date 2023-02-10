import { Component, Inject } from '@angular/core';
import { nav_path } from 'src/app/app-routing.module';
import { DOCUMENT } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { appInformation } from "../../../../information";

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
    private route: ActivatedRoute
  ) {
    route.fragment.forEach(fragment => this.document.querySelector(`#${fragment}`)?.scrollIntoView());
  }
}
