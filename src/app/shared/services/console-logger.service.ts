import { Injectable, isDevMode } from '@angular/core';
import {
  MatSnackBar, MatSnackBarConfig, MatSnackBarRef, TextOnlySnackBar,
} from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class ConsoleLoggerService {
  isInDevelopmentMode = () => isDevMode();

  constructor(private snackBar: MatSnackBar) {}

  debug(value: string, ...restOfError: unknown[]): void {
    if (!this.isInDevelopmentMode()) return;
    console.debug(`${value}: `, restOfError);
  }

  info(value: string, ...restOfError: unknown[]): void {
    if (this.isInDevelopmentMode()) {
      console.info(`${value}: `, restOfError);
    }
    this.openSnackBar(value, 'OK', { duration: 5000, panelClass: 'info' });
  }

  log(value: string, ...restOfError: unknown[]): void {
    if (this.isInDevelopmentMode()) {
      console.log(`${value}: `, restOfError);
    }
    this.openSnackBar(value, 'OK', { duration: 5000, panelClass: 'log' });
  }

  warn(value: string, ...restOfError: unknown[]): void {
    if (this.isInDevelopmentMode()) {
      console.warn(`${value}: `, restOfError);
    }
    this.openSnackBar(value, 'OK', { duration: 10000, panelClass: 'warn' });
  }

  error(value: string, ...restOfError: unknown[]): void {
    if (this.isInDevelopmentMode()) {
      console.error(`${value}: `, restOfError);
    }
    this.openSnackBar(value, 'OK', { duration: 0, panelClass: 'error' });
  }

  openSnackBar(
    message: string,
    action: string | undefined,
    config: MatSnackBarConfig | undefined,
  ): MatSnackBarRef<TextOnlySnackBar> {
    return this.snackBar.open(message, action, config);
  }
}
