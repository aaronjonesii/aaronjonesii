import { Routes } from '@angular/router';
import { authNavPath } from './features/auth/routes';
import { AdminGuard } from './shared/guards/admin.guard';
import { adminNavPath } from './shared/routes/admin.routes';
import { errorsNavPath } from './shared/routes/errors.routes';
import { projectsNavPath } from './shared/routes/projects.routes';
import { policiesNavPath } from './shared/routes/policies.routes';

export const navPath = {
  about: '/about',
  accountDetails: '/account-details',
  ...adminNavPath,
  ...authNavPath,
  bookAppointment: '/book-appointment',
  comingSoon: '/coming-soon',
  contact: '/contact',
  ...errorsNavPath,
  home: '/',
  ...policiesNavPath,
  ...projectsNavPath,
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
    path: '',
    loadChildren: () => import('./shared/modules/layout-routing.module')
      .then((m) => m.LayoutRoutingModule),
  },
];
