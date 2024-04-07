import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { private_nav_path } from './private/private.module';
import { error_nav_path } from './core/components/errors/errors.module';
import { LayoutComponent } from "./shared/components/layout/layout.component";
import { AdminGuard } from "./core/guards/admin.guard";
import { AuthGuard } from "./core/guards/auth.guard";
import { auth_nav_path } from "./features/auth/auth.module";

export const nav_path = {
  home: '/',
  comingSoon: '/coming-soon',
  about: '/about',
  auth: '/auth', ...auth_nav_path,
  contact: '/contact',
  policies: '/policies',
  termsOfUse: '/policies/terms-of-use',
  privacyPolicy: '/policies/privacy-policy',
  projects: '/projects',
  ...private_nav_path,
  ...error_nav_path
};

const routes: Routes = [
  { path: '', component: LayoutComponent, children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./features/home/home.component')
          .then((m) => m.HomeComponent),
      },
      {
        path: 'about',
        loadComponent: () => import('./features/about/about.component')
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
        loadComponent: () => import('./features/auth/views/forgot-password/forgot-password.component')
          .then((m) => m.ForgotPasswordComponent),
      },
      {
        path: 'auth/sign-in',
        loadComponent: () => import('./features/auth/views/sign-in/sign-in.component')
          .then((m) => m.SignInComponent),
      },
      {
        path: 'auth/sign-up',
        loadComponent: () => import('./features/auth/views/sign-up/sign-up.component')
          .then((m) => m.SignUpComponent),
      },
      {
        path: 'contact',
        loadComponent: () => import('./features/contact/contact.component')
          .then((m) => m.ContactComponent),
      },
      {
        path: 'projects',
        loadComponent: () => import('./features/projects/projects.component')
          .then((m) => m.ProjectsComponent),
      },
      {
        path: 'projects/:projectID',
        loadComponent: () => import('./features/projects/project-detail/project-detail.component')
          .then((m) => m.ProjectDetailComponent),
      },
    ] },
  {
    path: 'policies',
    loadComponent: () => import('./features/policies/policies.component')
      .then((m) => m.PoliciesComponent),
  },
  {
    path: 'policies/terms-of-use',
    loadComponent: () => import('./features/policies/terms-of-use/terms-of-use.component')
      .then((m) => m.TermsOfUseComponent),
  },
  {
    path: 'policies/privacy-policy',
    loadComponent: () => import('./features/policies/privacy-policy/privacy-policy.component')
      .then((m) => m.PrivacyPolicyComponent),
  },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadChildren: () => import('./private/views/admin/admin.module')
      .then(m => m.AdminModule),
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'account-details',
        canActivate: [AuthGuard],
        loadComponent: () => import('./private/views/account-details/account-details.component')
          .then(m => m.AccountDetailsComponent),
      },
    ],
  },
  // { path: '', loadChildren: () => import('./private/private.module').then(m => m.PrivateModule) },
  { path: '', loadChildren: () => import('./core/components/errors/errors.module').then(m => m.ErrorsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    initialNavigation: 'enabledBlocking',
    scrollPositionRestoration: 'top',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
