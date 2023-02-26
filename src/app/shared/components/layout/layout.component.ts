import { Component } from '@angular/core';
import { MenuService } from "../../services/menu.service";
import { AuthService } from "../../../core/services/auth.service";
import { nav_path } from "../../../app-routing.module";
import { appInformation } from "../../../information";
import { BreakpointObserver } from "@angular/cdk/layout";
import { map } from "rxjs";
import { NavigationRailAnimation } from "../navigation-rail/navigation-rail.animations";
import { NavigationBarAnimation } from "../navigation-bar/navigation-bar.animations";
import { NavigationDrawerAnimation } from "../navigation-drawer/navigation-drawer.animations";

@Component({
  selector: 'aj-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [
    NavigationRailAnimation,
    NavigationBarAnimation,
    NavigationDrawerAnimation,
  ],
})
export class LayoutComponent {
  public readonly title = appInformation.name;
  public readonly nav_path = nav_path;
  public segments = this.menuService.navigationBarMenu;
  /** Breakpoints can be found from src/assets/scss/partials/_media_queries.scss */
  public isMobile$ = this.breakpointObserver.observe('(max-width: 599px)')
    .pipe(map(state => state.matches));
  public isTabletPortrait$ = this.breakpointObserver.observe('(min-width: 600px)')
    .pipe(map(state => state.matches));
  private isTabletLandscape$ = this.breakpointObserver.observe('(min-width: 905px)')
    .pipe(map(state => state.matches));
  private isDesktop$ = this.breakpointObserver.observe('(min-width: 1440px)')
    .pipe(map(state => state.matches));
  public isDesktopExpanded$ = this.breakpointObserver.observe('(min-width: 1648px)')
    .pipe(map(state => state.matches));
  constructor(
    public menuService: MenuService,
    public auth: AuthService,
    private breakpointObserver: BreakpointObserver,
  ) {
    /** Add button if admin */
    auth.user$.forEach(async (user) => {
      if (await auth.isAdmin(user)) {
        const adminNavigationBarMenu = [
          ...this.menuService.navigationBarMenu,
          { name: 'Admin', icon: 'admin_panel_settings', routerLink: [nav_path.adminDashboard] }
        ];

        if (this.segments.toString() != adminNavigationBarMenu.toString()) this.segments = adminNavigationBarMenu;
      }
    });
  }
}
