import { Component, Inject, OnDestroy } from '@angular/core';
import { TopAppBarService } from "./shared/components/top-app-bar/top-app-bar.service";
import { appInformation } from "./information";
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { SwUpdateService } from "./shared/services/sw-update.service";
import { IconService } from "./shared/services/icon.service";
import { filter, Subscription } from "rxjs";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: 'aj-root',
  template: '<router-outlet />',
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent implements OnDestroy {
  readonly title = appInformation.title;
  private subscriptions = new Subscription();

  constructor(
    private router: Router,
    private iconService: IconService,
    private swUpdate: SwUpdateService,
    private topAppBarService: TopAppBarService,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.iconService.registerSvgIcons();

    this.topAppBarService.setOptions({
      title: this.title,
      showBackBtn: false,
      loading: false,
    });

    this.swUpdate.checkForSwUpdate();

    const navigationEndEvents = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
    );

    this.subscriptions.add(
      navigationEndEvents.subscribe(() => this.resetScrollPosition()),
    );
  }

  resetScrollPosition() {
    if (typeof this.document === 'object' && this.document) {
      const mainContentEl = this.document
        .querySelector('main#content');
      if (mainContentEl) {
        mainContentEl.scrollTop = 0;
      }
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
