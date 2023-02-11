import { Component } from '@angular/core';
import { GenericItem } from "../../../shared/interfaces/generic-item";
import { MenuService } from "../../../shared/services/menu.service";

@Component({
  selector: 'aj-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  public readonly title = 'Admin';

  public readonly segments: GenericItem[] = this.menuService.adminNavigationBarMenu;

  constructor(private menuService: MenuService) {}
}
