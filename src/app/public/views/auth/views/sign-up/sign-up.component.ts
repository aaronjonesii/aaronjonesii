import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { nav_path } from 'src/app/app-routing.module';
import { AuthService } from 'src/app/core/services/auth.service';
import { ConsoleLoggerService } from 'src/app/core/services/console-logger.service';
import { SeoService } from '../../../../../core/services/seo.service';
import { appInformation } from "../../../../../information";

@Component({
  selector: 'aj-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  public readonly title = 'Sign up';
  public readonly nav_path = nav_path;
  public readonly appInformation = appInformation;
  public signupForm = new FormGroup({
    email: new FormControl<string>(
      '',
      {nonNullable: true, validators: [Validators.required, Validators.email]}
    ),
    password: new FormControl<string>(
      '',
      {nonNullable: true, validators: [Validators.required, Validators.minLength(8)]})
  });
  public hidePassword = true;
  public loading = false;

  constructor(
    public auth: AuthService,
    private cLog: ConsoleLoggerService,
    private seo: SeoService
  ) {
    seo.generateTags({
      title: this.title,
      description: `Authentication ${this.title} page for ${appInformation.website}`,
      route: nav_path.signUp
    });
  }

  public get email() { return this.signupForm.controls.email; }
  public get password() { return this.signupForm.controls.password; }

  public async onSubmit() {
    this.loading = true;

    await this.auth.signUp(this.email.value, this.password.value).finally(() => this.loading = false);
  }
}
