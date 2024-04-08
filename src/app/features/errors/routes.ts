import { Route } from "@angular/router";

export const errors_nav_path = {
  pageNotFound: '/error/404',
  forbidden: '/error/403'
};

export default [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '404',
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