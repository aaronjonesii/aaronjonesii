import { Inject, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { DOCUMENT } from "@angular/common";
import { ConsoleLoggerService } from "./console-logger.service";
import { companyInformation } from "../../companyinformation";

@Injectable({ providedIn: 'root' })
export class SwUpdateService {
  private updateAvailable = false;

  constructor(
    private swUpdate: SwUpdate,
    private cLog: ConsoleLoggerService,
    @Inject(DOCUMENT) private document: Document
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
        .catch(error => this.cLog.error(`error checking for service worker update`, error));
    }
  }

  async notifyUpdateAvailable() {
    await this.cLog.openSnackBar(
      `A new version of ${companyInformation.name} is available`,
      'Refresh',
      { duration: 0 }
    ).onAction().forEach(() => this.reloadPage());
  }

  reloadPage() {
    // Reload the page to update to the latest version.
    this.document.location.reload();
  }
}
