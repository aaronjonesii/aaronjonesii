import { Route } from "@angular/router";

export const projects_nav_path = {
  projects: '/projects',
  projectDetail: (id: string) => `/projects/${id}`,
};

export default [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./projects.component')
      .then((m) => m.ProjectsComponent),
  },
  {
    path: ':projectID',
    loadComponent: () => import('./project-detail/project-detail.component')
      .then((m) => m.ProjectDetailComponent),
  },
] satisfies Route[];