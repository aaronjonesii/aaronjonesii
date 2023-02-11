import { Component, Input } from '@angular/core';
import { AuthService } from "../../../core/services/auth.service";
import { nav_path } from "../../../app-routing.module";
import { Location } from "@angular/common";

@Component({
  selector: 'aj-top-app-bar',
  templateUrl: './top-app-bar.component.html',
  styleUrls: ['./top-app-bar.component.scss']
})
export class TopAppBarComponent {
  @Input() title = 'Title';
  @Input() showBackBtn = false;
  @Input() loading = false;
  public readonly nav_path = nav_path;

  constructor(
    public location: Location,
    public auth: AuthService
  ) {}
}
