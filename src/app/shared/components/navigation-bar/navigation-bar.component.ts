import { Component, Input } from '@angular/core';
import { GenericItem } from '../../interfaces/generic-item';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'aj-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss',
  standalone: true,
  imports: [
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
    MatIconModule,
  ],
})
export class NavigationBarComponent {
  @Input() segments: GenericItem[] = this.menuService.pages;

  constructor(private menuService: MenuService) {}
}
