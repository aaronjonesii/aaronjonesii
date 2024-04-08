import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from "./shared/components/layout/layout.component";
import { AdminGuard } from "./core/guards/admin.guard";
import { AuthGuard } from "./core/guards/auth.guard";
import { admin_nav_path } from "./features/admin/admin.module";
import { auth_nav_path } from "./features/auth/routes";
import { projects_nav_path } from "./features/projects/routes";

export const nav_path = {
  home: '/',
  comingSoon: '/coming-soon',
  about: '/about',
  ...auth_nav_path,
  contact: '/contact',
  policies: '/policies',
  termsOfUse: '/policies/terms-of-use',
  privacyPolicy: '/policies/privacy-policy',
  ...projects_nav_path,
  accountDetails: '/account-details',
  admin: '/admin', ...admin_nav_path,
  pageNotFound: '/error/404',
  forbidden: '/error/403'
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
      {
        path: 'auth',
        loadChildren: () => import('./features/auth/routes'),
      },
      {
        path: 'contact',
        loadComponent: () => import('./features/contact/contact.component')
          .then((m) => m.ContactComponent),
      },
      {
        path: 'projects',
        loadChildren: () => import('./features/projects/routes'),
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
    loadChildren: () => import('./features/admin/admin.module')
      .then(m => m.AdminModule),
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'account-details',
        canActivate: [AuthGuard],
        loadComponent: () => import('./features/account-details/account-details.component')
          .then(m => m.AccountDetailsComponent),
      },
    ],
  },
  { path: '', component: LayoutComponent, children: [
      {
        path: 'error/404',
        loadComponent: () => import('./core/components/errors/page-not-found/page-not-found.component')
          .then((m) => m.PageNotFoundComponent),
      },
      {
        path: 'error/403',
        loadComponent: () => import('./core/components/errors/forbidden/forbidden.component')
          .then((m) => m.ForbiddenComponent),
      },
      {
        path: '**',
        loadComponent: () => import('./core/components/errors/page-not-found/page-not-found.component')
          .then((m) => m.PageNotFoundComponent),
      },
    ] },
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
