import { Component, OnInit } from '@angular/core';
import {
  AbstractControl, FormControl, FormGroup,
  ValidationErrors, Validators
} from '@angular/forms';
import { lastValueFrom, take } from 'rxjs';
import { AuthError, User } from "@angular/fire/auth";
import { UpdateProfileResponse } from "../../../shared/interfaces/functions";
import { FunctionsError } from "@angular/fire/functions";
import { AuthService } from "../../../core/services/auth.service";
import { ConsoleLoggerService } from "../../../core/services/console-logger.service";
import { Profile } from "../../../shared/interfaces/profile";
import { ProfileForm } from "../../../shared/forms/profile-form";
import { nav_path } from "../../../app-routing.module";
import { Router } from "@angular/router";

@Component({
  selector: 'aj-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {
  public user: User | null = null;
  public profile: Profile = { displayName: '', photoURL: '', email: '' };
  public editAccountForm = new FormGroup<ProfileForm>({
    displayName: new FormControl<string>(
      {value: '', disabled: true},
      {nonNullable: true, validators: Validators.required}
    ),
    email: new FormControl<string>(
      {value: '', disabled: true},
      {nonNullable: true, validators: [Validators.required, Validators.email]}
    ),
    photoURL: new FormControl<string>({value: '', disabled: true}, this._urlValidator),
  });
  public loading = true;

  constructor(
    public auth: AuthService,
    private cLog: ConsoleLoggerService,
    private router: Router,
  ) {}
  async ngOnInit() {
    try {
      this.user = await lastValueFrom(this.auth.loadUser.pipe(take(1)));
      this.auth.assertUser(this.user);

      this.profile = {
        displayName: this.user?.displayName,
        photoURL: this.user?.photoURL,
        email: <string>this.user.email,
      };
      this.setForm();
    } catch (error) {
      this.cLog.error(`Something went wrong loading account`, error, this.auth.loadUser)
    }
  }

  private _urlValidator({value}: AbstractControl): null | ValidationErrors {
    try { new URL(value); return null; } catch { return {pattern: true}; }
  }

  private setForm() {
    this.editAccountForm = new FormGroup<ProfileForm>({
      displayName: new FormControl<string>(
        {value: this.profile.displayName ?? '', disabled: true},
        {nonNullable: true, validators: Validators.required}
      ),
      email: new FormControl<string>(
        {value: this.profile.email ?? '', disabled: true},
        {nonNullable: true, validators: [Validators.required, Validators.email]}
      ),
      photoURL: new FormControl<string>({value: this.profile.photoURL ?? '', disabled: true}, this._urlValidator)
    });

    this.loading = false;
  }

  public get displayName() { return this.editAccountForm.controls.displayName; }
  private get photoURL() { return this.editAccountForm.controls.photoURL; }
  public get email() { return this.editAccountForm.controls.email; }

  public async saveDisplayName() {
    try {
      this.loading = true;

      // check if display name changed
      if (this.profile.displayName === this.displayName.value) {
        return;
      }

      // update user display name
      await this.auth.updateUser({displayName: this.displayName.value})
        .then(res => {
          res = <UpdateProfileResponse>res;
          if (res.ok && res.user) {
            /** update user variables in component here */
          }

          this.cLog.log(res.message);
          this.profile.displayName = this.displayName.value;
        })
        .catch((error: FunctionsError) => {throw new Error(error.message)});

      // disable form field
      this.displayName.disable();
    } catch (error) {
      this.cLog.error(`Something went wrong updating account display name`, error, this.profile.displayName, this.displayName.value);
    } finally {
      this.loading = false;
    }
  }

  public editEmail() {
    try {
      this.loading = true;

      this.cLog.openSnackBar(
        `Please reach out to update your email address!`,
        'Contact',
        { duration: 0 }
      ).onAction().forEach(() => this.router.navigate([nav_path.contact]));

    } catch (error) {
      this.cLog.error(`Something went wrong updating email address. Reauthenticate and try again`, error);
    } finally {
      this.loading = false;
    }
  }
}
