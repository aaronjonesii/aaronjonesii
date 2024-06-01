import { Inject, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { DOCUMENT } from '@angular/common';
import { ConsoleLoggerService } from './console-logger.service';
import { appInformation } from '../../information';

@Injectable({ providedIn: 'root' })
export class SwUpdateService {
  constructor(
    private swUpdate: SwUpdate,
    private logger: ConsoleLoggerService,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  async checkForSwUpdate() {
    if (this.swUpdate.isEnabled) {
      await this.swUpdate.checkForUpdate()
        .then((updateAvailable) => {
          if (updateAvailable) {
            this.notifyUpdateAvailable();
          }
        }).catch((error) => {
          this.logger.error(`Error checking for new version`, error);
        });
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
    this.document.location.reload();
  }
}
