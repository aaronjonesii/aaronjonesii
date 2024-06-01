import { Route } from '@angular/router';
import { AdminComponent } from './admin.component';

export default [
  { path: '', component: AdminComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        // eslint-disable-next-line max-len
        loadComponent: () => import('./views/admin-dashboard/admin-dashboard.component')
          .then((m) => m.AdminDashboardComponent),
      },
      {
        path: 'file-manager',
        // eslint-disable-next-line max-len
        loadComponent: () => import('./views/admin-file-manager/admin-file-manager.component')
          .then((m) => m.AdminFileManagerComponent),
      },
      {
        path: 'projects',
        loadChildren: () => import('./views/admin-projects/routes'),
      },
      {
        path: 'users',
        loadChildren: () => import('./views/admin-users/routes'),
      },
    ] },
] satisfies Route[];
