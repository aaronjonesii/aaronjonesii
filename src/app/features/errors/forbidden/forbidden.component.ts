import { Component } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";
import { nav_path } from '../../../app.routes';

@Component({
  selector: 'aj-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrl: './forbidden.component.scss',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
})
export class ForbiddenComponent {
  readonly nav_path = nav_path;
}