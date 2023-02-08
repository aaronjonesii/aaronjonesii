import { Component } from '@angular/core';
import { nav_path } from "../../../app-routing.module";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ConsoleLoggerService } from "../../../core/services/console-logger.service";
import { FunctionsService } from "../../../shared/services/functions.service";
import { appInformation } from "../../../information";
import { SeoService } from "../../../core/services/seo.service";

@Component({
  selector: 'aj-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.scss']
})
export class ComingSoonComponent {
  public readonly nav_path = nav_path;
  public readonly currentYear = new Date().getFullYear();
  public readonly appInformation = appInformation;
  public subscribeForm = new FormGroup({
    email: new FormControl<string>(
      '',
      { nonNullable:true, validators: [Validators.required, Validators.email] }
    )
  });
  public loading = false;
  public success = false;

  constructor(
    private cLog: ConsoleLoggerService,
    private fun: FunctionsService,
    private seo: SeoService
  ) {
    this.seo.generateTags({
      title: 'Coming Soon page',
      route: nav_path.comingSoon
    });
  }
  get email() { return this.subscribeForm.controls.email; }

  public async onSubscribe(): Promise<void> {
    try {
      this.loading = true;

      if (this.email.invalid) {
        throw new Error('Please enter a valid email address.')
      }

      this.subscribeForm.disable();
      const email = this.email.value;

      await this.fun.httpsCallable('subscribe', {email})
        .then(result => {
          this.cLog.log(`Thanks, you're in the loop`, result);
          this.success = true;
        })
        .catch(error => {throw new Error(error.message)});
    } catch (error: any) {
      this.cLog.error(error.message)
    } finally {
      this.subscribeForm.enable();
      this.loading = false;
    }
  }
}
