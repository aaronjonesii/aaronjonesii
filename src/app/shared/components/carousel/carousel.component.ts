import {
  ChangeDetectionStrategy,
  Component, inject,
  input, model, output, signal,
} from '@angular/core';
import { CarouselItem } from '../../interfaces/carousel';
import { NgClass, NgOptimizedImage } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { generateRandomNumber } from '../../utils/generate-random-number';
import { SkeletonComponent } from '../skeleton/skeleton.component';
import { isTouchDevice } from '../../utils/is-touch-device';

@Component({
  selector: 'aj-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgClass,
    NgOptimizedImage, RouterLink,
    SkeletonComponent,
  ],
})
export class CarouselComponent {
  router = inject(Router);

  protected readonly generateRandomNumber = (
    min: number,
    max: number,
  ) => generateRandomNumber(min, max);

  items = input<CarouselItem[]>([]);
  loaded = input(false);
  activeIndex = model(0);
  private previousIndex = signal(0);

  get isTouchDevice(): boolean {
    return isTouchDevice();
  }

  itemClicked = output<CarouselItem>();

  onMouseEnter(index: number) {
    if (!this.isTouchDevice) this.activeIndex.set(index);
  }

  onItemClick(index: number) {
    const item = this.items().at(index);
    if (!item) return;

    /** handle touch interactions */
    if (this.isTouchDevice) {
      if (index === this.activeIndex()) {
        this.navigateToItem(item);
      } else this.activeIndex.set(index);
    } else {
      this.navigateToItem(item);
    }

    this.itemClicked.emit(item);
  }

  navigateToItem(item: CarouselItem) {
    if (item?.routerLink) {
      this.router.navigate(Array.isArray(item.routerLink) ?
        item.routerLink : [item.routerLink]);
    }
  }
}
