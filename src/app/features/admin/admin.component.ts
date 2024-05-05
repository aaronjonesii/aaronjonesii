import { Component, OnDestroy, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  NavigationBarComponent,
} from '../../shared/components/navigation-bar/navigation-bar.component';
import { GenericItem } from '../../shared/interfaces/generic-item';
import { MenuService } from '../../shared/services/menu.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map, Subscription } from 'rxjs';
import { AsyncPipe, NgClass } from '@angular/common';
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
    NgClass,
    AsyncPipe,
    RouterOutlet,
    TopAppBarComponent,
    NavigationBarComponent,
    NavigationRailComponent,
    NavigationDrawerComponent,
  ],
  animations: [
    SlideInFromLeftAnimation,
    SlideInFromBottomAnimation,
  ],
})
export class AdminComponent implements OnDestroy {
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
  private subscriptions = new Subscription();
  private lastScrollY = 0;
  showBottomBar = signal(false);
  isMobile = signal(false);

  constructor(
    private menuService: MenuService,
    private breakpointObserver: BreakpointObserver,
  ) {
    this.subscriptions.add(
      this.isMobile$.subscribe((isMobile) => {
        this.isMobile.set(isMobile);
        this.showBottomBar.set(isMobile);
      }),
    );
  }

  onContentScroll(event: Event) {
    if (!this.isMobile()) return;

    const el = event.srcElement as HTMLElement;
    const scrollY = el.scrollTop || 0;
    const prevScrollY = this.lastScrollY || 0;
    this.lastScrollY = scrollY;

    if (scrollY > prevScrollY) {
      this.showBottomBar.set(false);
    } else {
      this.showBottomBar.set(true);
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
