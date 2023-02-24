import { animate, style, transition, trigger } from "@angular/animations";

export const NavigationBarAnimation = [
  trigger('navigationBarAnimation', [
    transition(':enter', [
      style({transform: 'translateY(100%)'}),
      animate('400ms 100ms cubic-bezier(0.05, 0.7, 0.1, 1.0)', style({transform: 'translateY(0%)'})),
    ]),
    transition(':leave', [
      animate('200ms 100ms cubic-bezier(0.3, 0.0, 0.8, 0.15)', style({transform: 'translateY(100%)'})),
    ]),
  ]),
];
