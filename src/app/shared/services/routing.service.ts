import { afterNextRender, AfterRenderPhase, Inject, Injectable, OnDestroy } from '@angular/core';
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
    this.location.back();
  }

  /** To only be used in constructor */
  watchAndRouteToFragment() {
    afterNextRender(() => {
      this.subscriptions.add(
        this.route.fragment.subscribe((fragment) => {
          setTimeout(() => {
            this.document.querySelector(`#${fragment}`)?.scrollIntoView({behavior: 'smooth'});
          }, 1000);
        }),
      );
    }, {phase: AfterRenderPhase.Read});
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
