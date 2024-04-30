import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";
import { nav_path } from '../../../app.routes';
import { RoutingService } from "../../../shared/services/routing.service";

@Component({
  selector: 'aj-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss',
  standalone: true,
  imports: [MatButtonModule, RouterLink, NgOptimizedImage],
})
export class PageNotFoundComponent {
  nav_path = nav_path;

  constructor(private routing: RoutingService) {}

  goBack() {
    this.routing.goBack();
  }
}
