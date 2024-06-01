import { Component, Input } from '@angular/core';
import { GenericItem } from '../../interfaces/generic-item';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'aj-navigation-rail',
  templateUrl: './navigation-rail.component.html',
  styleUrl: './navigation-rail.component.scss',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive,
  ],
})
export class NavigationRailComponent {
  @Input() segments: GenericItem[] = this.menuService.pages;

  constructor(private menuService: MenuService) {}
}
