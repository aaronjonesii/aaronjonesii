import { Routes } from "@angular/router";
import { auth_nav_path } from "./features/auth/routes";
import { AdminGuard } from "./shared/guards/admin.guard";
import { admin_nav_path } from "./shared/routes/admin.routes";
import { errors_nav_path } from "./shared/routes/errors.routes";
import { projects_nav_path } from "./shared/routes/projects.routes";
import { policies_nav_path } from "./shared/routes/policies.routes";

export const nav_path = {
  home: '/',
  comingSoon: '/coming-soon',
  about: '/about',
  contact: '/contact',
  accountDetails: '/account-details',
  ...auth_nav_path,
  ...admin_nav_path,
  ...policies_nav_path,
  ...projects_nav_path,
  ...errors_nav_path,
};

export const routes: Routes = [
  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadChildren: () => import('./features/admin/routes'),
  },
  {
    path: 'policies',
    loadChildren: () => import('./features/policies/routes'),
  },
  {
    path: '', loadChildren: () => import('./shared/modules/layout-routing.module')
      .then((m) => m.LayoutRoutingModule),
  },
];
