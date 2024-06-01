import { Component } from '@angular/core';
import {
  TopAppBarComponent,
} from '../../../../shared/components/top-app-bar/top-app-bar.component';
import {
  MasonryCardsComponent,
} from '../../../../shared/components/masonry-cards/masonry-cards.component';
import { GenericItem } from '../../../../shared/interfaces/generic-item';
import { MenuService } from '../../../../shared/services/menu.service';
import {
  TopAppBarService,
} from '../../../../shared/components/top-app-bar/top-app-bar.service';

@Component({
  selector: 'aj-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  standalone: true,
  imports: [TopAppBarComponent, MasonryCardsComponent],
})
export class AdminDashboardComponent {
  protected readonly title = 'Dashboard';
  adminPages: GenericItem[] = [];

  constructor(
    private menuService: MenuService,
    private topAppBarService: TopAppBarService,
  ) {
    this.topAppBarService.setOptions({
      title: `Admin ${this.title}`,
      loading: false,
      showBackBtn: true,
    });

    this.adminPages = this.menuService.adminPages
      .filter((menuItem) => menuItem.name != this.title);
  }
}
