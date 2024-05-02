import { Component } from '@angular/core';
import {
  FormControl, FormGroup,
  ReactiveFormsModule, Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { NgOptimizedImage } from '@angular/common';
import {
  TopAppBarService,
} from '../../../../shared/components/top-app-bar/top-app-bar.service';
import { navPath } from '../../../../app.routes';
import { appInformation } from '../../../../information';
import { AuthService } from '../../../../shared/services/auth.service';
import { SeoService } from '../../../../shared/services/seo.service';

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
  readonly nav_path = navPath;
  readonly appInformation = appInformation;
  signupForm = new FormGroup({
    email: new FormControl<string>(
      '',
      { nonNullable: true, validators: [Validators.required, Validators.email] }
    ),
    password: new FormControl<string>(
      '',
      {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(8)],
      },
    ),
  });
  hidePassword = true;
  loading = false;

  constructor(
    public auth: AuthService,
    private seoService: SeoService,
    private topAppBarService: TopAppBarService,
  ) {
    this.topAppBarService.setOptions({
      title: this.title,
      showBackBtn: true,
      loading: false,
    });
    this.auth.checkIfSignedIn(navPath.signUp, 0);

    this.seoService.generateTags({
      title: this.title,
      // eslint-disable-next-line max-len
      description: `Authentication ${this.title} page for ${appInformation.website}`,
      route: navPath.signUp,
    });
  }

  get email() {
    return this.signupForm.controls.email;
  }
  get password() {
    return this.signupForm.controls.password;
  }

  async onSubmit() {
    this.loading = true;

    await this.auth.signUp(this.email.value, this.password.value)
      .finally(() => this.loading = false);
  }
}
