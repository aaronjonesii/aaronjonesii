import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { navPath } from '../../../app.routes';
import { RoutingService } from '../../../shared/services/routing.service';
import {
  SlideInFromBottomAnimation,
} from '../../../shared/animations/slide-in-from-bottom.animations';
import {
  SlideInFromLeftAnimation,
} from '../../../shared/animations/slide-in-from-left.animations';
import {
  SlideInFromRightAnimation,
} from '../../../shared/animations/slide-in-from-right.animations';

@Component({
  selector: 'aj-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss',
  standalone: true,
  imports: [MatButtonModule, RouterLink, NgOptimizedImage],
  animations: [
    SlideInFromLeftAnimation,
    SlideInFromRightAnimation,
    SlideInFromBottomAnimation,
  ],
})
export class PageNotFoundComponent {
  protected readonly navPath = navPath;

  constructor(private routing: RoutingService) {}

  goBack() {
    this.routing.goBack();
  }
}
