import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { nav_path } from 'src/app/app-routing.module';
import { appInformation } from 'src/app/information';
import { ConsoleLoggerService } from "../../core/services/console-logger.service";
import { FunctionsService } from "../../shared/services/functions.service";
import { SeoService } from "../../core/services/seo.service";

@Component({
  selector: 'aj-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrl: './coming-soon.component.scss',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,

  ],
})
export class ComingSoonComponent {
  readonly nav_path = nav_path;
  readonly currentYear = new Date().getFullYear();
  readonly appInformation = appInformation;
  subscribeForm = new FormGroup({
    email: new FormControl<string>(
      '',
      { nonNullable:true, validators: [Validators.required, Validators.email] }
    )
  });
  loading = false;
  success = false;

  constructor(
    private cLog: ConsoleLoggerService,
    private fun: FunctionsService,
    private seo: SeoService,
  ) {
    this.seo.generateTags({
      title: 'Coming Soon page',
      route: nav_path.comingSoon
    });
  }
  get email() { return this.subscribeForm.controls.email; }

  async onSubscribe(): Promise<void> {
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
    } catch (error) {
      this.cLog.error((error as Error).message)
    } finally {
      this.subscribeForm.enable();
      this.loading = false;
    }
  }
}
