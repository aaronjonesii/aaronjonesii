import {
  animate,
  style,
  transition,
  trigger,
} from '@angular/animations';

function generateRandomDelay(min: number = 0, max: number = 500): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const FadeInOutAnimation = [
  trigger('fadeInOutAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(
          /** Emphasized decelerate */
          `1s ${generateRandomDelay()}ms cubic-bezier(0.05, 0.7, 0.1, 1.0)`,
          style({ opacity: 1 }),
        ),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate(
          /** Emphasized accelerate */
          '500ms cubic-bezier(0.3, 0.0, 0.8, 0.15)',
          style({ opacity: 0 }),
        ),
      ]),
    ],
  ),
];
