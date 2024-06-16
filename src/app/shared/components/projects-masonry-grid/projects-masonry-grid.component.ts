import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Inject,
  input,
} from '@angular/core';
import {
  ProjectWithTech,
} from '../../interfaces/project';
import { DOCUMENT } from '@angular/common';
import { navPath } from '../../../app.routes';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { SSRSafeService } from '../../services/ssr-safe.service';

@Component({
  selector: 'aj-projects-masonry-grid',
  templateUrl: './projects-masonry-grid.component.html',
  styleUrl: './projects-masonry-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ProjectCardComponent],
})
// eslint-disable-next-line max-len
export class ProjectsMasonryGridComponent implements AfterViewChecked, AfterViewInit {
  protected readonly navPath = navPath;

  projects = input<ProjectWithTech[]>();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private ssrSafe: SSRSafeService,
  ) {}

  /*
  * Resize the items when all the images inside the masonry grid
  * finish loading. This will ensure that all the content inside our
  * masonry items is visible.
  *
  * @uses Document
  * @uses resizeMasonryItem
  */
  ngAfterViewInit() {
    if (!this.ssrSafe.isBrowser) return;
    const allImages = this.document.images;
    Promise.all(
      Array.from(allImages)
        .filter((img) => !img.complete)
        .map((img) => new Promise((resolve) => {
          img.onload = img.onerror = resolve;
        })),
    ).then(() => {
      /** all images have loaded */
      this.resizeAllMasonryItems();
    });
  }

  ngAfterViewChecked() {
    this.resizeAllMasonryItems();
  }

  /* Resize all the grid items on resize events */
  onResize() {
    this.resizeAllMasonryItems();
  }

  resizeMasonryItem(item: HTMLElement) {
    // get grid object, row-gap, and size of its implicit rows
    const grid = this.document.getElementsByClassName('masonry-grid')[0];
    if (!grid || !this.ssrSafe.hasWindow) return;

    const rowGap = parseInt(
      window.getComputedStyle(grid).getPropertyValue('grid-row-gap'),
    );
    const rowHeight = parseInt(
      window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'),
    );
    const gridImagesAsContent = item
      .querySelector<HTMLElement>('img.masonry-content');

    /*
    * Spanning for any brick = S
    * Grids row-gap = G
    * Size of grid's implicitly create row-track = R
    * Height of item content = H
    * Net height of the item = H1 = H + G
    * Net height of the implicit row-track = T = G + R
    * S = H1 / T
    */
    const itemHeight = item.querySelector('.masonry-content')
      ?.getBoundingClientRect().height || 0;
    const rowSpan = Math.ceil((itemHeight + rowGap) / (rowHeight + rowGap));
    // set the spanning as calculated above (S)
    item.style.gridRowEnd = 'span ' + rowSpan;
    // Make images take all the available space in the cell/item
    if (gridImagesAsContent) {
      gridImagesAsContent.style.height =
        item.getBoundingClientRect().height + 'px';
    }
  }

  /*
    * Apply spanning to all the masonry items
    * Loop through all the items and apply the spanning to them using
    * `resizeMasonryItem()` function
    * @uses resizeMasonryItem
    */
  resizeAllMasonryItems() {
    const allItems: NodeListOf<HTMLElement> = this.document
      .querySelectorAll('.masonry-item');
    /*
    * Loop through the above list and execute the spanning function to
    * each list-item (i.e. each masonry item)
    */
    for (let i = 0; i < allItems.length; i++) {
      this.resizeMasonryItem(allItems[i]);
    }
  }
}
