import { afterNextRender, Inject, Injectable, OnDestroy } from '@angular/core';
import { DOCUMENT, Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Injectable({ providedIn: 'root' })
export class RoutingService implements OnDestroy {
  private subscriptions = new Subscription();

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  goBack() {
    afterNextRender(() => {
      this.location.back();
    });
  }

  watchAndRouteToFragment() {
    afterNextRender(() => {
      this.subscriptions.add(
        this.route.fragment.subscribe((fragment) => {
          afterNextRender(() => {
            this.document.querySelector(`#${fragment}`)?.scrollIntoView();
          });
        }),
      );
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
