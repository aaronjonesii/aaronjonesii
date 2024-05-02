import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  NavigationBarComponent,
} from '../../shared/components/navigation-bar/navigation-bar.component';
import { GenericItem } from '../../shared/interfaces/generic-item';
import { MenuService } from '../../shared/services/menu.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import {
  NavigationDrawerComponent,
} from '../../shared/components/navigation-drawer/navigation-drawer.component';
import {
  NavigationRailComponent,
} from '../../shared/components/navigation-rail/navigation-rail.component';
import {
  TopAppBarComponent,
} from '../../shared/components/top-app-bar/top-app-bar.component';
import {
  SlideInFromLeftAnimation,
} from '../../shared/animations/slide-in-from-left.animations';
import {
  SlideInFromBottomAnimation,
} from '../../shared/animations/slide-in-from-bottom.animations';

@Component({
  selector: 'aj-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  standalone: true,
  imports: [
    RouterOutlet,
    NavigationBarComponent,
    AsyncPipe,
    NavigationDrawerComponent,
    NavigationRailComponent,
    TopAppBarComponent,
  ],
  animations: [
    SlideInFromLeftAnimation,
    SlideInFromBottomAnimation,
  ],
})
export class AdminComponent {
  readonly title = 'Admin';
  readonly segments: GenericItem[] = this.menuService.adminPages
    .concat(this.menuService.pages.filter((p) => p.id === 'home'));
  /**
   * Breakpoints can be found at src/assets/scss/partials/_media_queries.scss
   */
  isMobile$ = this.breakpointObserver.observe('(max-width: 599px)')
    .pipe(map((state) => state.matches));
  isTabletPortrait$ = this.breakpointObserver.observe('(min-width: 600px)')
    .pipe(map((state) => state.matches));
  isDesktopExpanded$ = this.breakpointObserver.observe('(min-width: 1648px)')
    .pipe(map((state) => state.matches));

  constructor(
    private menuService: MenuService,
    private breakpointObserver: BreakpointObserver,
  ) {}
}
