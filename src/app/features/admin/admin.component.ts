import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { NavigationBarComponent } from "../../shared/components/navigation-bar/navigation-bar.component";
import { GenericItem } from "../../shared/interfaces/generic-item";
import { MenuService } from "../../shared/services/menu.service";

@Component({
  selector: 'aj-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  standalone: true,
  imports: [RouterOutlet, NavigationBarComponent],
})
export class AdminComponent {
  readonly title = 'Admin';

  readonly segments: GenericItem[] = this.menuService.adminNavigationBarMenu;

  constructor(private menuService: MenuService) {}
}
