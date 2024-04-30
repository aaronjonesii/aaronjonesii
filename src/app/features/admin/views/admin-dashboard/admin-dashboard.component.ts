import { Component } from '@angular/core';
import { TopAppBarComponent } from "../../../../shared/components/top-app-bar/top-app-bar.component";
import { MasonryCardsComponent } from "../../../../shared/components/masonry-cards/masonry-cards.component";
import { GenericItem } from "../../../../shared/interfaces/generic-item";
import { MenuService } from "../../../../shared/services/menu.service";

@Component({
  selector: 'aj-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  standalone: true,
  imports: [TopAppBarComponent, MasonryCardsComponent],
})
export class AdminDashboardComponent {
  protected readonly title = 'Dashboard';
  adminPages: GenericItem[] = [];

  constructor(private menuService: MenuService) {
    this.adminPages = this.menuService.adminMenu.filter((menuItem) => menuItem.name != this.title);
  }
}
