import { Component, Input } from '@angular/core';
import { GenericItem } from "../../interfaces/generic-item";
import { MatCardModule } from "@angular/material/card";
import { RouterLink } from "@angular/router";
/**
 * Flexbox Horizontal Line Masonry Cards
 */
@Component({
  selector: 'aj-masonry-cards',
  templateUrl: './masonry-cards.component.html',
  styleUrl: './masonry-cards.component.scss',
  standalone: true,
  imports: [
    MatCardModule,
    RouterLink,
  ],
})
export class MasonryCardsComponent {
  @Input() items: GenericItem[] = [];
  /**
   * Enter a name to call the items when the provided array of items is empty
   * Ex. cards or products
   */
  @Input() itemsName = 'items';
  @Input() emptyText = ''
}
