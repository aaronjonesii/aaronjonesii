import { Route } from '@angular/router';

export default [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./admin-technologies.component')
      .then((m) => m.AdminTechnologiesComponent),
  },
  {
    path: 'create',
    // eslint-disable-next-line max-len
    loadComponent: () => import('./create-technology/create-technology.component')
      .then((m) => m.CreateTechnologyComponent),
  },
  // {
  //   path: ':technologyId/edit',
  // eslint-disable-next-line max-len
  //   loadComponent: () => import('./edit-technology/edit-technology.component')
  //     .then((m) => m.EditTechnologyComponent),
  // },
] satisfies Route[];
