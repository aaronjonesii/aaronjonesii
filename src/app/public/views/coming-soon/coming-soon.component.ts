import { Component } from '@angular/core';
import { nav_path } from "../../../app-routing.module";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ConsoleLoggerService } from "../../../core/services/console-logger.service";

@Component({
  selector: 'aj-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.scss']
})
export class ComingSoonComponent {
  public readonly nav_path = nav_path;
  public readonly name = 'Aaron Jones II';
  public readonly currentYear = new Date().getFullYear();
  public readonly github = 'https://github.com/aaronjonesii';
  public subscribeForm = new FormGroup({
    email: new FormControl<string>(
      '',
      { nonNullable:true, validators: [Validators.required, Validators.email ] }
    )
  });
  public loading = false;

  constructor(private cLog: ConsoleLoggerService) {}
  get email() { return this.subscribeForm.controls.email; }

  public onSubscribe(): void {
    if (this.subscribeForm.invalid) {
      this.cLog.warn(`Please enter a valid email address.`);
      return;
    }

    this.loading = true;
    this.subscribeForm.disable();

    const email = this.email.value;
    this.cLog.openSnackBar(`subscribe email: '${email}'`, '🆗', {
      duration: 0
    });

    this.subscribeForm.enable();
    this.loading = false;
  }
}
