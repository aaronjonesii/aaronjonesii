import {
  afterNextRender, AfterRenderPhase,
  Inject, Injectable, OnDestroy,
} from '@angular/core';
import { DOCUMENT, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RoutingService implements OnDestroy {
  private subscriptions = new Subscription();

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  /**
   * Smoothly scrolls the browser to an element with the specified ID.
   *
   * @param {string} elementId - The ID of the element to scroll to.
   */
  scrollToElementId(elementId: string) {
    this.document.getElementById(elementId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }

  /**
   * Navigates the browser back one step in the history.
   */
  goBack() {
    this.location.back();
  }

  /** To only be used in constructor */
  /**
   * Subscribes to the URL fragment of the current route and automatically
   * scrolls to the corresponding element after the next render.
   * This allows scrolling to elements linked using URL fragments
   * (e.g., #section1).
   *
   * @remarks **Important:** Intended for use only within a constructor.
   */
  watchAndRouteToFragment() {
    afterNextRender(() => {
      this.subscriptions.add(
        this.route.fragment.subscribe((fragment) => {
          setTimeout(() => {
            this.document.querySelector(`#${fragment}`)
              ?.scrollIntoView({ behavior: 'smooth' });
          }, 500);
        }),
      );
    }, { phase: AfterRenderPhase.Read });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
