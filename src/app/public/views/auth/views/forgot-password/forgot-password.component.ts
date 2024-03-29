import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { nav_path } from 'src/app/app-routing.module';
import { AuthService } from 'src/app/core/services/auth.service';
import { ConsoleLoggerService } from 'src/app/core/services/console-logger.service';
import { SeoService } from '../../../../../core/services/seo.service';
import { appInformation } from "../../../../../information";
import { TopAppBarService } from "../../../../../shared/components/top-app-bar/top-app-bar.service";

@Component({
  selector: 'aj-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  public readonly title = "Forgot password";
  public readonly nav_path = nav_path;
  public forgotPasswordForm = new FormGroup({
    email: new FormControl<string>(
      '', {nonNullable: true, validators: [Validators.required, Validators.email]}
    )
  });
  public loading = false;

  constructor(
    public auth: AuthService,
    private cLog: ConsoleLoggerService,
    private seoService: SeoService,
    private topAppBarService: TopAppBarService,
  ) {
    topAppBarService.setOptions({
      title: this.title,
      showBackBtn: true,
      loading: false,
    });
    seoService.generateTags({
      title: this.title,
      description: `Authentication ${this.title} page for ${appInformation.website}`,
      route: nav_path.forgotPassword
    });
  }

  get email() { return this.forgotPasswordForm.controls.email; }

  async onSubmit(): Promise<void> {
    if (this.email.invalid) {
      this.cLog.error(`Please enter a valid email address`);
      return;
    }

    this.loading = true;

    await this.auth.sendPasswordResetEmail(this.email.value)
      .finally(() => this.loading = false);
  }
}
