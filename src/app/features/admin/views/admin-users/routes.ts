import { Route } from "@angular/router";

export const admin_users_nav_path = {
  adminUsers: '/admin/users',
  adminUserDetail: (id: string) => `/admin/users/${id}`,
};

export default [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./admin-users.component')
      .then(m => m.AdminUsersComponent),
  },
  {
    path: ':userUID',
    loadComponent: () => import('./admin-user-detail/admin-user-detail.component')
      .then(m => m.AdminUserDetailComponent),
  },
] satisfies Route[];