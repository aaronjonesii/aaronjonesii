import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { ReactiveFormsModule } from "@angular/forms";

const CORE_MODULES = [CommonModule, ReactiveFormsModule];

const COMPONENTS = []!;

export const admin_nav_path = {
  adminDashboard: '/admin/dashboard',
  adminProjects: '/admin/projects',
  adminAddProject: '/admin/projects/add',
  adminFileManager: '/admin/file-manager',
  adminUsers: '/admin/users',
};

const routes: Routes = [
  { path: '', component: AdminComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./views/admin-dashboard/admin-dashboard.component')
          .then(m => m.AdminDashboardComponent),
      },
      {
        path: 'file-manager',
        loadComponent: () => import('./views/admin-file-manager/admin-file-manager.component')
          .then(m => m.AdminFileManagerComponent),
      },
      {
        path: 'projects',
        loadComponent: () => import('./views/admin-projects/admin-projects.component')
          .then(m => m.AdminProjectsComponent),
      },
      {
        path: 'users',
        loadComponent: () => import('./views/admin-users/admin-users.component')
          .then(m => m.AdminUsersComponent),
      },
    ] }
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [ RouterModule.forChild(routes), ...CORE_MODULES ],
  exports: [...COMPONENTS]
})
export class AdminModule { }
