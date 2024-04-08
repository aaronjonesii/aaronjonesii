import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from "./shared/components/layout/layout.component";
import { AdminGuard } from "./core/guards/admin.guard";
import { AuthGuard } from "./core/guards/auth.guard";
import { admin_nav_path } from "./features/admin/routes";
import { auth_nav_path } from "./features/auth/routes";
import { projects_nav_path } from "./features/projects/routes";
import { policies_nav_path } from "./features/policies/routes";
import { errors_nav_path } from "./features/errors/routes";

export const nav_path = {
  home: '/',
  comingSoon: '/coming-soon',
  about: '/about',
  ...auth_nav_path,
  contact: '/contact',
  ...policies_nav_path,
  ...projects_nav_path,
  accountDetails: '/account-details',
  ...admin_nav_path,
  ...errors_nav_path,
};

const routes: Routes = [
  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadChildren: () => import('./features/admin/routes'),
  },
  {
    path: 'policies',
    loadChildren: () => import('./features/policies/routes'),
  },
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
        path: 'account-details',
        canActivate: [AuthGuard],
        loadComponent: () => import('./features/account-details/account-details.component')
          .then(m => m.AccountDetailsComponent),
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
        path: 'error',
        loadChildren: () => import('./features/errors/routes'),
      },
      {
        path: 'projects',
        loadChildren: () => import('./features/projects/routes'),
      },
      {
        path: '**',
        loadComponent: () => import('./features/errors/page-not-found/page-not-found.component')
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
