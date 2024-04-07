import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { policies_nav_path } from "./views/policies/policies.module";
import { auth_nav_path } from "../features/auth/auth.module";

export const public_nav_path = {
  home: '/',
  comingSoon: '/coming-soon',
  about: '/about',
  auth: '/auth', ...auth_nav_path,
  contact: '/contact',
  policies: '/policies', ...policies_nav_path,
  projects: '/projects'
};

const routes: Routes = [
  {
    path: 'policies',
    loadComponent: () => import('./views/policies/policies.component')
      .then((m) => m.PoliciesComponent),
  },
  {
    path: 'policies/terms-of-use',
    loadComponent: () => import('./views/policies/terms-of-use/terms-of-use.component')
      .then((m) => m.TermsOfUseComponent),
  },
  {
    path: 'policies/privacy-policy',
    loadComponent: () => import('./views/policies/privacy-policy/privacy-policy.component')
      .then((m) => m.PrivacyPolicyComponent),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicModule { }
