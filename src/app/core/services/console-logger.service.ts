import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ConsoleLoggerService {
  private readonly isInProduction: boolean;

  constructor(private snackBar: MatSnackBar) {
    this.isInProduction = environment.production;
  }
  public info(value: string, ...restOfError: any[]): void {
    if (!this.isInProduction) {console.info(`${value}: `, restOfError)}
    this.openSnackBar(value, 'OK', {duration: 5000, panelClass: ['mat-toolbar', 'mat-primary']});
  }

  public log(value: string, ...restOfError: any[]): void {
    if (!this.isInProduction) {console.log(`${value}: `, restOfError)}
    this.openSnackBar(value, 'OK', {duration: 5000, panelClass: 'log'});
  }

  public warn(value: string, ...restOfError: any[]): void {
    if (!this.isInProduction) {console.warn(`${value}: `, restOfError)}
    this.openSnackBar(value, 'OK', {duration: 10000, panelClass: 'warn'});
  }

  public error(value: string, ...restOfError: any[]): void {
    if (!this.isInProduction) {console.error(`${value}: `, restOfError)}
    this.openSnackBar(value, 'OK', {duration: 0, panelClass: 'error'});
  }


  public openSnackBar(message: string, action: string = 'OK', config: MatSnackBarConfig): MatSnackBarRef<any> {
    return this.snackBar.open(message, action, config);
  }
}
