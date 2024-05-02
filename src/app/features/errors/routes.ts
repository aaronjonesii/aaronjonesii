import { Route } from '@angular/router';

export default [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./error/error.component')
      .then((m) => m.ErrorComponent),
  },
  {
    path: '404',
    loadComponent: () => import('./page-not-found/page-not-found.component')
      .then((m) => m.PageNotFoundComponent),
  },
  {
    path: '403',
    loadComponent: () => import('./forbidden/forbidden.component')
      .then((m) => m.ForbiddenComponent),
  },
] satisfies Route[];
