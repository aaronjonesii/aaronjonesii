import { afterNextRender, Inject, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { DOCUMENT } from "@angular/common";
import { ConsoleLoggerService } from "./console-logger.service";
import { appInformation } from "../../information";

@Injectable({ providedIn: 'root' })
export class SwUpdateService {
  private updateAvailable = false;

  constructor(
    private swUpdate: SwUpdate,
    private logger: ConsoleLoggerService,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  async checkForSwUpdate() {
    if (this.swUpdate.isEnabled){
      await this.swUpdate.checkForUpdate()
        .then(updateAvailable => {
          if (updateAvailable) {
            this.updateAvailable = updateAvailable;
            this.notifyUpdateAvailable();
          }
        })
        .catch(error => this.logger.error(`error checking for service worker update`, error));
    }
  }

  async notifyUpdateAvailable() {
    await this.logger.openSnackBar(
      `A new version of ${appInformation.website} is available`,
      'Refresh',
      { duration: 0 }
    ).onAction().forEach(() => this.reloadPage());
  }

  reloadPage() {
    // Reload the page to update to the latest version.
    afterNextRender(() => {
      this.document.location.reload();
    });
  }
}
