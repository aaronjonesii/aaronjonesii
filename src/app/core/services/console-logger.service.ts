import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ConsoleLoggerService {
  private readonly isInProduction: boolean;

  constructor(private snackBar: MatSnackBar) {
    this.isInProduction = environment.production;
  }

  debug(value: string, ...restOfError: unknown[]): void {
    if (!this.isInProduction) {console.debug(`${value}: `, restOfError)}
    this.openSnackBar(value, 'OK', {duration: 5000, panelClass: ['mat-toolbar', 'mat-primary']});
  }

  info(value: string, ...restOfError: unknown[]): void {
    if (!this.isInProduction) {console.info(`${value}: `, restOfError)}
    this.openSnackBar(value, 'OK', {duration: 5000, panelClass: ['mat-toolbar', 'mat-primary']});
  }

  log(value: string, ...restOfError: unknown[]): void {
    if (!this.isInProduction) {console.log(`${value}: `, restOfError)}
    this.openSnackBar(value, 'OK', {duration: 5000, panelClass: 'log'});
  }

  warn(value: string, ...restOfError: unknown[]): void {
    if (!this.isInProduction) {console.warn(`${value}: `, restOfError)}
    this.openSnackBar(value, 'OK', {duration: 10000, panelClass: 'warn'});
  }

  error(value: string, ...restOfError: unknown[]): void {
    if (!this.isInProduction) {console.error(`${value}: `, restOfError)}
    this.openSnackBar(value, 'OK', {duration: 0, panelClass: 'error'});
  }


  openSnackBar(message: string, action: string | undefined, config: MatSnackBarConfig | undefined): MatSnackBarRef<unknown> {
    return this.snackBar.open(message, action, config);
  }
}
