import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './views/sign-in/sign-in.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './views/sign-up/sign-up.component';
import { MatButtonModule } from '@angular/material/button';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";

const COMPONENTS = []!;

export const auth_nav_path = {
  signIn: '/auth/sign-in',
  signUp: '/auth/sign-up',
  forgotPassword: '/auth/forgot-password'
};

const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent }
];

const ANGULAR_MATERIAL_MODULES = [
  MatButtonModule, MatFormFieldModule, MatInputModule,
  MatToolbarModule, MatIconModule
];

const CORE_MODULES = [
  CommonModule, ReactiveFormsModule
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [RouterModule.forChild(routes), ...CORE_MODULES, ...ANGULAR_MATERIAL_MODULES],
  exports: [RouterModule]
})
export class AuthModule { }
