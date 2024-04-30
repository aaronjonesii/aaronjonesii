import { NgModule } from '@angular/core';
import { LayoutComponent } from "../components/layout/layout.component";
import { Route, RouterModule } from "@angular/router";
import { AuthGuard } from "../guards/auth.guard";

export const routes: Route[] = [
  { path: '', component: LayoutComponent, children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('../../features/home/home.component')
          .then((m) => m.HomeComponent),
      },
      {
        path: 'about',
        loadComponent: () => import('../../features/about/about.component')
          .then((m) => m.AboutComponent),
      },
      {
        path: 'account-details',
        canActivate: [AuthGuard],
        loadComponent: () => import('../../features/account-details/account-details.component')
          .then(m => m.AccountDetailsComponent),
      },
      {
        path: 'auth',
        loadChildren: () => import('../../features/auth/routes'),
      },
      {
        path: 'contact',
        loadComponent: () => import('../../features/contact/contact.component')
          .then((m) => m.ContactComponent),
      },
      {
        path: 'error',
        loadChildren: () => import('../../features/errors/routes'),
      },
      {
        path: 'projects',
        loadChildren: () => import('../../features/projects/routes'),
      },
      {
        path: '**',
        loadComponent: () => import('../../features/errors/page-not-found/page-not-found.component')
          .then((m) => m.PageNotFoundComponent),
      },
    ] },
];

@NgModule({ imports: [RouterModule.forChild(routes)] })
export class LayoutRoutingModule {}
