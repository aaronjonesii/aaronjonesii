import { Component } from '@angular/core';
import {
  FormControl, FormGroup,
  ReactiveFormsModule, Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import {
  TopAppBarService,
} from '../../../../shared/components/top-app-bar/top-app-bar.service';
import { appInformation } from '../../../../information';
import { navPath } from '../../../../app.routes';
import { AuthService } from '../../../../shared/services/auth.service';
import {
  ConsoleLoggerService,
} from '../../../../shared/services/console-logger.service';
import { SeoService } from '../../../../shared/services/seo.service';

@Component({
  selector: 'aj-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    NgOptimizedImage,
  ],
})
export class ForgotPasswordComponent {
  readonly title = 'Forgot password';
  readonly nav_path = navPath;
  forgotPasswordForm = new FormGroup({
    email: new FormControl<string>(
      '',
      {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      },
    ),
  });
  loading = false;

  constructor(
    private auth: AuthService,
    private seoService: SeoService,
    private logger: ConsoleLoggerService,
    private topAppBarService: TopAppBarService,
  ) {
    this.topAppBarService.setOptions({
      title: this.title,
      showBackBtn: true,
      loading: false,
    });
    this.seoService.generateTags({
      title: this.title,
      // eslint-disable-next-line max-len
      description: `Authentication ${this.title} page for ${appInformation.website}`,
      route: navPath.forgotPassword,
    });
  }

  get email() {
    return this.forgotPasswordForm.controls.email;
  }

  async onSubmit(): Promise<void> {
    if (this.email.invalid) {
      this.logger.error(`Please enter a valid email address`);
      return;
    }

    this.loading = true;

    await this.auth.sendPasswordResetEmail(this.email.value)
      .finally(() => this.loading = false);
  }

  async googleLogin() {
    await this.auth.googleLogin();
  }
}
