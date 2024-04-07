import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { auth_nav_path } from "../features/auth/auth.module";

export const public_nav_path = {
  home: '/',
  comingSoon: '/coming-soon',
  about: '/about',
  auth: '/auth', ...auth_nav_path,
  contact: '/contact',
  policies: '/policies',
  termsOfUse: '/policies/terms-of-use',
  privacyPolicy: '/policies/privacy-policy',
  projects: '/projects'
};

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicModule { }
