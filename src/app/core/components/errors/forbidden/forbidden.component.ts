import { Component } from '@angular/core';
import { nav_path } from 'src/app/app-routing.module';

@Component({
  selector: 'aj-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss']
})
export class ForbiddenComponent {
  public readonly nav_path = nav_path;
}
