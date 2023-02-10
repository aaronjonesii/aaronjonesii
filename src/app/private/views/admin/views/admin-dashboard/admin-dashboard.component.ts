import { Component } from '@angular/core';
import { MenuService } from "../../../../../shared/services/menu.service";
import { GenericItem } from "../../../../../shared/interfaces/generic-item";

@Component({
  selector: 'aj-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  public readonly title = 'Dashboard';
  public adminPages: GenericItem[] = [];

  constructor(private menuService: MenuService) {
    this.adminPages = menuService.adminMenu.filter(menuItem => menuItem.name != this.title);
  }
}
