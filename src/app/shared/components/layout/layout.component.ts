import {
  Component,
  OnDestroy, signal,
} from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { navPath } from '../../../app.routes';
import { appInformation } from '../../../information';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map, Subscription } from 'rxjs';
import {
  NavigationRailComponent,
} from '../navigation-rail/navigation-rail.component';
import {
  NavigationDrawerComponent,
} from '../navigation-drawer/navigation-drawer.component';
import { TopAppBarComponent } from '../top-app-bar/top-app-bar.component';
import {
  NavigationBarComponent,
} from '../navigation-bar/navigation-bar.component';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe, NgClass } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import {
  SlideInFromLeftAnimation,
} from '../../animations/slide-in-from-left.animations';
import {
  SlideInFromBottomAnimation,
} from '../../animations/slide-in-from-bottom.animations';
import { GenericItem } from '../../interfaces/generic-item';

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
    NgClass,
  ],
})
export class LayoutComponent implements OnDestroy {
  readonly title = appInformation.name;
  readonly nav_path = navPath;
  segments = this.menuService.pages;
  /**
   * Breakpoints can be found from src/assets/scss/partials/_media_queries.scss
   * */
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
    private auth: AuthService,
    private menuService: MenuService,
    private breakpointObserver: BreakpointObserver,
  ) {
    /** Add button if admin */
    this.subscriptions.add(
      this.auth.user$.subscribe(async (user) => {
        const adminSegment: GenericItem = {
          id: 'admin', name: 'Admin',
          icon: 'admin_panel_settings',
          routerLink: [navPath.adminDashboard],
        };
        const segmentsIncludeAdmin = this.segments.some((s) => {
          return s.id === adminSegment.id;
        });

        const isAdmin = await this.auth.isAdmin(user);
        /** Add admin segment */
        if (isAdmin && !segmentsIncludeAdmin) {
            this.segments.push(adminSegment);
        } else if (!isAdmin && segmentsIncludeAdmin) {
          /** Remove admin segment */
          this.segments = this.segments.filter((s) => {
            return s.id !== adminSegment.id;
          });
        }
      }),
    );

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
    const prevScrollY = scrollY > 0 ? (this.lastScrollY || 0) : scrollY;
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
