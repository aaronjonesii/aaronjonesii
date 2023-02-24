import { animate, style, transition, trigger } from "@angular/animations";

export const NavigationRailAnimation = [
  trigger(
    'navigationRailAnimation', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('400ms cubic-bezier(0.05, 0.7, 0.1, 1.0)', style({transform: 'translateX(0%)'})),
      ]),
      transition(':leave', [
        animate('200ms cubic-bezier(0.3, 0.0, 0.8, 0.15)', style({transform: 'translateX(-100%)'})),
      ]),
    ],
  ),
];
