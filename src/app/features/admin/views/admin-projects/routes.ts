import { Route } from "@angular/router";

export const admin_projects_nav_path = {
  adminProjects: '/admin/projects',
  adminAddProject: '/admin/projects/add',
  adminEditProject: (id: string) => `/admin/projects/${id}/edit`,
};

export default [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./admin-projects.component')
      .then(m => m.AdminProjectsComponent),
  },
  {
    path: 'add',
    loadComponent: () => import('./add-project/add-project.component')
      .then(m => m.AddProjectComponent),
  },
  {
    path: ':projectID/edit',
    loadComponent: () => import('./edit-project/edit-project.component')
      .then(m => m.EditProjectComponent),
  },
] satisfies Route[];