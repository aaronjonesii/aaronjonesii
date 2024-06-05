import {
  ChangeDetectionStrategy,
  Component,
  input, model,
} from '@angular/core';
import { CarouselItem } from '../../interfaces/carousel';
import { NgClass } from '@angular/common';

@Component({
  selector: 'aj-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgClass],
})
export class CarouselComponent {
  items = input<CarouselItem[]>([
    { id: 'test', name: 'Test', image: 'assets/imgs/AICowboy.png' },
    {
      id: 'test1',
      name: 'Tests',
      image: 'assets/imgs/aaron_jones_transparent.webp',
    },
    {
      id: 'test2',
      name: 'Testing',
      image: 'assets/imgs/small_mixed_kid_with_an_afro.png',
    },
    { id: 'test', name: 'Test', image: 'assets/imgs/AICowboy.png' },
    {
      id: 'test1',
      name: 'Tests',
      image: 'assets/imgs/aaron_jones_transparent.webp',
    },
    {
      id: 'test2',
      name: 'Testing',
      image: 'assets/imgs/small_mixed_kid_with_an_afro.png',
    },
  ]);
  loaded = input(false);
  activeIndex = model(0);
}
