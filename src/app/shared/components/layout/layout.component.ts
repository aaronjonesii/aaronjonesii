import { Component } from '@angular/core';
import { MenuService } from "../../services/menu.service";
import { AuthService } from "../../../core/services/auth.service";
import { nav_path } from "../../../app-routing.module";

@Component({
  selector: 'aj-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  public readonly title = 'Layout';
  public readonly nav_path = nav_path;
  public segments = this.menuService.navigationBarMenu;
  constructor(
    public menuService: MenuService,
    public auth: AuthService
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
