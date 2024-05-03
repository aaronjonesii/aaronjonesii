import {
  style,
  transition,
  trigger,
  animate, AnimationTriggerMetadata,
} from '@angular/animations';

export const WordAnimation: AnimationTriggerMetadata[] = [
  trigger('wordAnimation', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(-50%)' }),
      animate(
        /** Emphasized decelerate */
        '800ms 200ms cubic-bezier(0.3, 0.0, 0.8, 0.15)',
        style({ opacity: 1, transform: 'translateY(0)' }),
      ),
    ]),
    transition(':leave', [
      style({ opacity: 1, transform: 'translateY(0)' }),
      animate(
        /** Emphasized accelerate */
        '200ms cubic-bezier(0.3, 0.0, 0.8, 0.15)',
        style({ opacity: 0, transform: 'translateY(-50%)' }),
      ),
    ]),
  ]),
];
