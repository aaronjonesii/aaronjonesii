import { Component } from '@angular/core';
import { nav_path } from 'src/app/app-routing.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { SeoService } from '../../../../core/services/seo.service';

@Component({
  selector: 'aj-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
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
  public readonly nav_path = nav_path;
  public readonly title = "Sign in"
  public hidePassword = true;

  constructor(
    public auth: AuthService,
    private seo: SeoService
  ) {
    seo.generateTags({
      title: this.title,
      description: `Anonymous Systems ${this.title}`,
      route: nav_path.signIn
    });
  }
  public get email() { return this.loginForm.controls.email; }
  public get password() { return this.loginForm.controls.password; }

  public onSubmit() {
    this.auth.signIn(this.email.value, this.password.value);
  }
}
