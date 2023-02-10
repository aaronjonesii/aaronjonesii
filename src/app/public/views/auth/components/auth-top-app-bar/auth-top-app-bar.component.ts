import { Component, Input } from '@angular/core';
import { Location } from "@angular/common";

@Component({
  selector: 'aj-auth-top-app-bar',
  templateUrl: './auth-top-app-bar.component.html',
  styleUrls: ['./auth-top-app-bar.component.scss']
})
export class AuthTopAppBarComponent {
  @Input() title = 'Top app bar title';
  @Input() loading = true;

  constructor(public location: Location) {}
}
