import { Component, OnDestroy } from '@angular/core';
import { MenuService } from "../../services/menu.service";
import { nav_path } from "../../../app.routes";
import { appInformation } from "../../../information";
import { BreakpointObserver } from "@angular/cdk/layout";
import { map, Subscription } from "rxjs";
import { NavigationRailComponent } from "../navigation-rail/navigation-rail.component";
import { NavigationDrawerComponent } from "../navigation-drawer/navigation-drawer.component";
import { TopAppBarComponent } from "../top-app-bar/top-app-bar.component";
import { NavigationBarComponent } from "../navigation-bar/navigation-bar.component";
import { RouterOutlet } from "@angular/router";
import { AsyncPipe } from "@angular/common";
import { AuthService } from "../../services/auth.service";
import { SlideInFromLeftAnimation } from "../../animations/slide-in-from-left.animations";
import {
  SlideInFromBottomAnimation
} from "../../animations/slide-in-from-bottom.animations";

@Component({
  selector: 'aj-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  animations: [
    SlideInFromLeftAnimation,
    SlideInFromBottomAnimation,
  ],
  standalone: true,
  imports: [
    NavigationRailComponent,
    NavigationDrawerComponent,
    TopAppBarComponent,
    NavigationBarComponent,
    RouterOutlet,
    AsyncPipe,
  ],
})
export class LayoutComponent implements OnDestroy {
  readonly title = appInformation.name;
  readonly nav_path = nav_path;
  segments = this.menuService.pages;
  /** Breakpoints can be found from src/assets/scss/partials/_media_queries.scss */
  isMobile$ = this.breakpointObserver.observe('(max-width: 599px)')
    .pipe(map(state => state.matches));
  isTabletPortrait$ = this.breakpointObserver.observe('(min-width: 600px)')
    .pipe(map(state => state.matches));
  private isTabletLandscape$ = this.breakpointObserver.observe('(min-width: 905px)')
    .pipe(map(state => state.matches));
  private isDesktop$ = this.breakpointObserver.observe('(min-width: 1440px)')
    .pipe(map(state => state.matches));
  isDesktopExpanded$ = this.breakpointObserver.observe('(min-width: 1648px)')
    .pipe(map(state => state.matches));
  private subscriptions = new Subscription();

  constructor(
    private auth: AuthService,
    private menuService: MenuService,
    private breakpointObserver: BreakpointObserver,
  ) {
    /** Add button if admin */
    this.subscriptions.add(
      this.auth.user$.subscribe(async (user) => {
        if (await this.auth.isAdmin(user)) {
          const adminNavigationBarMenu = [
            ...this.menuService.pages,
            { name: 'Admin', icon: 'admin_panel_settings', routerLink: [nav_path.adminDashboard] }
          ];

          if (this.segments.toString() != adminNavigationBarMenu.toString()) this.segments = adminNavigationBarMenu;
        }
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
