import {
  animate, animateChild,
  AnimationTriggerMetadata, stagger, style,
  transition,
  trigger, query,
} from '@angular/animations';

export const ProjectsAnimations: AnimationTriggerMetadata[] = [
    trigger('projectsListAnimation', [
      transition('* => *', [
        query(':enter', [stagger(
          /** Emphasized decelerate */
          '200ms 50ms cubic-bezier(0.05, 0.7, 0.1, 1.0)',
          animateChild(),
        )], { optional: true }),
      ]),
    ]),
  trigger('projectAnimation', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateX(-10px)' }),
      animate(
        /** Emphasized decelerate */
        '600ms 150ms cubic-bezier(0.05, 0.7, 0.1, 1.0)',
        style({ opacity: 1, transform: 'translateX(0px)' }),
      ),
    ]),
    transition(':leave', [
      style({ opacity: 1 }),
      animate(
        /** Emphasized accelerate */
        '300ms cubic-bezier(0.3, 0.0, 0.8, 0.15)',
        style({ opacity: 0, transform: 'translateX(10px)' }),
      ),
    ]),
  ]),
];
