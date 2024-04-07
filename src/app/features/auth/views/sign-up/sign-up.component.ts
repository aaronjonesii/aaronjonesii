import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { nav_path } from 'src/app/app-routing.module';
import { AuthService } from 'src/app/core/services/auth.service';
import { ConsoleLoggerService } from 'src/app/core/services/console-logger.service';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { NgOptimizedImage } from "@angular/common";
import { appInformation } from 'src/app/information';
import { SeoService } from "../../../../core/services/seo.service";
import { TopAppBarService } from "../../../../shared/components/top-app-bar/top-app-bar.service";

@Component({
  selector: 'aj-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    NgOptimizedImage,
  ],
})
export class SignUpComponent {
  readonly title = 'Sign up';
  readonly nav_path = nav_path;
  readonly appInformation = appInformation;
  signupForm = new FormGroup({
    email: new FormControl<string>(
      '',
      {nonNullable: true, validators: [Validators.required, Validators.email]}
    ),
    password: new FormControl<string>(
      '',
      {nonNullable: true, validators: [Validators.required, Validators.minLength(8)]})
  });
  hidePassword = true;
  loading = false;

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
    this.auth.checkIfSignedIn(nav_path.signUp, 0);

    this.seoService.generateTags({
      title: this.title,
      description: `Authentication ${this.title} page for ${appInformation.website}`,
      route: nav_path.signUp
    });
  }

  get email() { return this.signupForm.controls.email; }
  get password() { return this.signupForm.controls.password; }

  async onSubmit() {
    this.loading = true;

    await this.auth.signUp(this.email.value, this.password.value)
      .finally(() => this.loading = false);
  }
}