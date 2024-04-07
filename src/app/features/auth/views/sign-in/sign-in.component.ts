import { Component } from '@angular/core';
import { nav_path } from 'src/app/app-routing.module';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, RouterLink } from "@angular/router";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { NgOptimizedImage } from "@angular/common";
import { appInformation } from 'src/app/information';
import { SeoService } from "../../../../core/services/seo.service";
import { TopAppBarService } from "../../../../shared/components/top-app-bar/top-app-bar.service";

@Component({
  selector: 'aj-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    NgOptimizedImage,
  ],
})
export class SignInComponent {
  readonly title = "Sign in"
  readonly nav_path = nav_path;
  readonly appInformation = appInformation;
  loginForm = new FormGroup({
    email: new FormControl<string>(
      '',
      {nonNullable: true, validators: [Validators.required, Validators.email]}
      ),
    password: new FormControl<string>(
      '',
      {nonNullable: true, validators: [Validators.required, Validators.minLength(8)]}
      )
  });
  hidePassword = true;
  loading = false;

  constructor(
    private router: Router,
    public auth: AuthService,
    private seoService: SeoService,
    private topAppBarService: TopAppBarService,
  ) {
    this.topAppBarService.setOptions({
      title: this.title,
      showBackBtn: true,
      loading: false,
    });
    this.auth.checkIfSignedIn(nav_path.signIn, 0);

    this.seoService.generateTags({
      title: this.title,
      description: `Authentication ${this.title} page for ${appInformation.website}`,
      route: nav_path.signIn
    });
  }
  get email() { return this.loginForm.controls.email; }
  get password() { return this.loginForm.controls.password; }

  async onSubmit() {
    if (this.loginForm.invalid) return;

    this.loading = true;

    await this.auth.signIn(this.email.value, this.password.value)
      .finally(() => this.loading = false);
  }
}
