import { Component } from '@angular/core';

@Component({
  selector: 'aj-home',
  template: `
    <h1 class="mat-headline-3">{{title}}</h1>
  `,
  styles: []
})
export class HomeComponent {
  public readonly title = "Home page";
}
