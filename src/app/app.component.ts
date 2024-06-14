import { Component } from '@angular/core';
import { TopAppBarService } from "./shared/components/top-app-bar/top-app-bar.service";
import { appInformation } from "./information";
import { RouterOutlet } from "@angular/router";
import { SwUpdateService } from "./shared/services/sw-update.service";
import { IconService } from "./shared/services/icon.service";

@Component({
  selector: 'aj-root',
  template: '<router-outlet />',
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent {
  readonly title = appInformation.title;

  constructor(
    private iconService: IconService,
    private swUpdate: SwUpdateService,
    private topAppBarService: TopAppBarService,
  ) {
    this.iconService.registerSvgIcons();

    this.topAppBarService.setOptions({
      title: this.title,
      showBackBtn: false,
      loading: false,
    });

    this.swUpdate.checkForSwUpdate();
  }
}
