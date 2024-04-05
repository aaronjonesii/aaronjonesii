import { Component } from '@angular/core';
import { GenericItem } from "../../../shared/interfaces/generic-item";
import { MenuService } from "../../../shared/services/menu.service";
import { RouterOutlet } from "@angular/router";
import { NavigationBarComponent } from "../../../shared/components/navigation-bar/navigation-bar.component";

@Component({
  selector: 'aj-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  standalone: true,
  imports: [
    RouterOutlet,
    NavigationBarComponent,
  ],
})
export class AdminComponent {
  public readonly title = 'Admin';

  public readonly segments: GenericItem[] = this.menuService.adminNavigationBarMenu;

  constructor(private menuService: MenuService) {}
}
