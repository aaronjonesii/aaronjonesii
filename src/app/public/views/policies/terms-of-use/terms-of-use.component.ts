import { Component, Inject } from '@angular/core';
import { nav_path } from "../../../../app-routing.module";
import { DOCUMENT } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { appInformation } from "../../../../information";

@Component({
  selector: 'aj-terms-of-use',
  templateUrl: './terms-of-use.component.html',
  styleUrls: ['./terms-of-use.component.scss']
})
export class TermsOfUseComponent {
  public readonly nav_path = nav_path;
  public readonly lastUpdated = new Date('02/09/2023');
  public readonly title = 'Terms of Use';
  public readonly appInformation = appInformation;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private route: ActivatedRoute
  ) {
    route.fragment.forEach(fragment => this.document.querySelector(`#${fragment}`)?.scrollIntoView());
  }
}
