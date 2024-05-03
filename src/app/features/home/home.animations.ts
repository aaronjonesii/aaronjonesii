import {
  SlideInFromBottomAnimation,
} from '../../shared/animations/slide-in-from-bottom.animations';
import {
  SlideInFromLeftAnimation,
} from '../../shared/animations/slide-in-from-left.animations';
import { WordAnimation } from '../../shared/animations/word.animations';
import {
  animate,
  AnimationTriggerMetadata, style,
  transition,
  trigger,
} from '@angular/animations';

export const HomeAnimations: AnimationTriggerMetadata[] = [
    ...SlideInFromLeftAnimation,
  trigger('titleAnimation', [
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
  trigger('imageAnimation', [
    transition(':enter', [
      style({ transform: 'translateY(100%)' }),
      /** Emphasized decelerate */
      animate(
        '1000ms 250ms cubic-bezier(0.05, 0.7, 0.1, 1.0)',
        style({ transform: 'translateY(0%)' }),
      ),
    ]),
    transition(':leave', [
      style({ transform: 'translateY(0%)' }),
      /** Emphasized accelerate */
      animate(
        '500ms cubic-bezier(0.3, 0.0, 0.8, 0.15)',
        style({ transform: 'translateY(100%)' }),
      ),
    ]),
  ]),
];
