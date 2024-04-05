import { Component } from '@angular/core';
import { nav_path } from 'src/app/app-routing.module';
import { Location } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'aj-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
})
export class PageNotFoundComponent {
  nav_path = nav_path;
  constructor(public location: Location) {}
}
