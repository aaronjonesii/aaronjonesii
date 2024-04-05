import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl, FormControl, FormGroup, ReactiveFormsModule,
  ValidationErrors, Validators
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from "@angular/fire/auth";
import { UpdateProfileResponse } from "../../../shared/interfaces/functions";
import { FunctionsError } from "@angular/fire/functions";
import { AuthService } from "../../../core/services/auth.service";
import { ConsoleLoggerService } from "../../../core/services/console-logger.service";
import { Profile } from "../../../shared/interfaces/profile";
import { ProfileForm } from "../../../shared/forms/profile-form";
import { nav_path } from "../../../app-routing.module";
import { Router } from "@angular/router";
import { PhotoUploadComponent } from "./photo-upload/photo-upload.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'aj-account-details',
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.scss',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PhotoUploadComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class AccountDetailsComponent implements OnInit, OnDestroy {
  user: User | null = null;
  profile: Profile = { displayName: '', photoURL: '', email: '' };
  editAccountForm = new FormGroup<ProfileForm>({
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
  loading = true;
  private subscriptions = new Subscription();

  constructor(
    public auth: AuthService,
    private cLog: ConsoleLoggerService,
    private router: Router,
  ) {}
  ngOnInit() {
    const user$ = this.auth.loadUser;
    this.subscriptions.add(
      user$.subscribe((user) => {
        this.user = user;
        this.auth.assertUser(user);

        this.profile = {
          displayName: user?.displayName,
          photoURL: user?.photoURL,
          email: <string>user.email,
        };
        this.setForm();
      }),
    );
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

  get displayName() { return this.editAccountForm.controls.displayName; }
  private get photoURL() { return this.editAccountForm.controls.photoURL; }
  get email() { return this.editAccountForm.controls.email; }

  async saveDisplayName() {
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

  editEmail() {
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

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
