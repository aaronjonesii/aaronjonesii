import { Component } from '@angular/core';
import { nav_path } from 'src/app/app-routing.module';
import { Location } from '@angular/common';

@Component({
  selector: 'aj-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {
  nav_path = nav_path;
  constructor(public location: Location) {}
}
