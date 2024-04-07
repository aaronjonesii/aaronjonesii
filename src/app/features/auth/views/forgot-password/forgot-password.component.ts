import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { nav_path } from 'src/app/app-routing.module';
import { AuthService } from 'src/app/core/services/auth.service';
import { ConsoleLoggerService } from 'src/app/core/services/console-logger.service';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";
import { NgOptimizedImage } from "@angular/common";
import { SeoService } from "../../../../core/services/seo.service";
import { TopAppBarService } from "../../../../shared/components/top-app-bar/top-app-bar.service";
import { appInformation } from "../../../../information";

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
    NgOptimizedImage
  ],
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
    this.topAppBarService.setOptions({
      title: this.title,
      showBackBtn: true,
      loading: false,
    });
    this.seoService.generateTags({
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
