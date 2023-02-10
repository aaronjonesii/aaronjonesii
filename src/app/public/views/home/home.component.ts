import { Component } from '@angular/core';

@Component({
  selector: 'aj-home',
  template: `
    <main>
      <h1 class="mat-headline-3">{{title}}</h1>
    </main>
    <aj-navigation-bar></aj-navigation-bar>
  `,
  styles: [
    `:host {display: flex;flex-direction: column;width: 100vw; height : 100vh;}`,
    `main {flex-grow: 1;overflow: auto;}`
  ]
})
export class HomeComponent {
  public title = "Home page";
}
