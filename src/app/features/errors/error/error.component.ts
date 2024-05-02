import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { navPath } from '../../../app.routes';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'aj-error',
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss',
  standalone: true,
  imports: [MatButton, RouterLink],
})
export class ErrorComponent {
  readonly nav_path = navPath;
}
