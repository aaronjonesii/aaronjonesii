import { Component } from '@angular/core';

@Component({
  selector: 'aj-home',
  template: `<h2>{{title}}</h2>`,
  styles: [``]
})
export class HomeComponent {
  public title = "Home page";
}
