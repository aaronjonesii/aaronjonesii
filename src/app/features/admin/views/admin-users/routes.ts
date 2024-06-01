import { Route } from '@angular/router';

export default [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./admin-users.component')
      .then((m) => m.AdminUsersComponent),
  },
  {
    path: ':userUID',
    // eslint-disable-next-line max-len
    loadComponent: () => import('./admin-user-detail/admin-user-detail.component')
      .then((m) => m.AdminUserDetailComponent),
  },
] satisfies Route[];
