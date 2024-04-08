import { Component } from '@angular/core';
import { nav_path } from 'src/app/app-routing.module';
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'aj-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrl: './forbidden.component.scss',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
})
export class ForbiddenComponent {
  public readonly nav_path = nav_path;
}
