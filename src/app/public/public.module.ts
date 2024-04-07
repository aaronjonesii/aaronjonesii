import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { home_nav_path } from './views/home/home.module';
import { auth_nav_path } from "./views/auth/auth.module";
import { policies_nav_path } from "./views/policies/policies.module";
import { LayoutComponent } from "../shared/components/layout/layout.component";
import { HomeComponent } from "./views/home/home.component";

export const public_nav_path = {
  home: '/', ...home_nav_path,
  comingSoon: '/coming-soon',
  about: '/about',
  auth: '/auth', ...auth_nav_path,
  contact: '/contact',
  policies: '/policies', ...policies_nav_path,
  projects: '/projects'
};

const routes: Routes = [
  { path: '', component: LayoutComponent, children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      {
        path: 'about',
        loadComponent: () => import('./views/about/about.component')
          .then((m) => m.AboutComponent),
      },
      /** Auth Routes */
      {
        path: 'auth',
        redirectTo: 'auth/sign-in',
        pathMatch: 'full',
      },
      {
        path: 'auth/forgot-password',
        loadComponent: () => import('./views/auth/views/forgot-password/forgot-password.component')
          .then((m) => m.ForgotPasswordComponent),
      },
      {
        path: 'auth/sign-in',
        loadComponent: () => import('./views/auth/views/sign-in/sign-in.component')
          .then((m) => m.SignInComponent),
      },
      {
        path: 'auth/sign-up',
        loadComponent: () => import('./views/auth/views/sign-up/sign-up.component')
          .then((m) => m.SignUpComponent),
      },
      {
        path: 'contact',
        loadComponent: () => import('./views/contact/contact.component')
          .then((m) => m.ContactComponent),
      },
      {
        path: 'projects',
        loadComponent: () => import('./views/projects/projects.component')
          .then((m) => m.ProjectsComponent),
      },
      {
        path: 'projects/:projectID',
        loadComponent: () => import('./views/projects/project-detail/project-detail.component')
          .then((m) => m.ProjectDetailComponent),
      },
    ] },
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
