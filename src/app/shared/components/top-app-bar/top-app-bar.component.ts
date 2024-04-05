import { Component, Input } from '@angular/core';
import { AuthService } from "../../../core/services/auth.service";
import { nav_path } from "../../../app-routing.module";
import { AsyncPipe, Location } from "@angular/common";
import { TopAppBarService } from "./top-app-bar.service";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'aj-top-app-bar',
  templateUrl: './top-app-bar.component.html',
  styleUrl: './top-app-bar.component.scss',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive,
    AsyncPipe,
  ],
})
export class TopAppBarComponent {
  @Input() title = 'Title';
  @Input() showBackBtn = false;
  @Input() loading = false;
  public readonly nav_path = nav_path;

  constructor(
    public location: Location,
    public auth: AuthService,
    private topAppBarService: TopAppBarService,
  ) {
    /** Set options from service */
    this.topAppBarService.options$.forEach(options => {
      this.title = options.title;
      this.showBackBtn = options.showBackBtn;
      this.loading = options.loading;
    });
  }
}
