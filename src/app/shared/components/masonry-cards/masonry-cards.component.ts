import { Component, Input } from '@angular/core';
import { GenericItem } from "../../interfaces/generic-item";
/**
 * Flexbox Horizontal Line Masonry Cards
 */
@Component({
  selector: 'aj-masonry-cards',
  templateUrl: './masonry-cards.component.html',
  styleUrls: ['./masonry-cards.component.scss']
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
