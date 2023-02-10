import { Component } from '@angular/core';
import { nav_path } from 'src/app/app-routing.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { SeoService } from '../../../../../core/services/seo.service';
import { appInformation } from "../../../../../information";
import { Router } from "@angular/router";
import { ConsoleLoggerService } from "../../../../../core/services/console-logger.service";

@Component({
  selector: 'aj-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  public readonly title = "Sign in"
  public readonly nav_path = nav_path;
  public loginForm = new FormGroup({
    email: new FormControl<string>(
      '',
      {nonNullable: true, validators: [Validators.required, Validators.email]}
      ),
    password: new FormControl<string>(
      '',
      {nonNullable: true, validators: [Validators.required, Validators.minLength(8)]}
      )
  });
  public hidePassword = true;
  public loading = false;

  constructor(
    private router: Router,
    public auth: AuthService,
    private seo: SeoService,
    private cLog: ConsoleLoggerService
  ) {
    auth.loadUser.forEach(user => {
      if (user) this.router.navigate([nav_path.home])
        .then(() => cLog.warn(`Already signed in`, user));
    });

    seo.generateTags({
      title: this.title,
      description: `Authentication ${this.title} page for ${appInformation.website}`,
      route: nav_path.signIn
    });
  }
  public get email() { return this.loginForm.controls.email; }
  public get password() { return this.loginForm.controls.password; }

  public async onSubmit() {
    this.loading = true;

    await this.auth.signIn(this.email.value, this.password.value)
      .finally(() => this.loading = false);
  }
}
