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
      { path: 'dashboard', loadChildren: () => import('./views/admin-dashboard/admin-dashboard.module')
          .then(m => m.AdminDashboardModule) },
      { path: 'file-manager', loadChildren: () => import('./views/admin-file-manager/admin-file-manager.module')
          .then(m => m.AdminFileManagerModule) },
      { path: 'projects', loadChildren: () => import('./views/admin-projects/admin-projects.module')
          .then(m => m.AdminProjectsModule) },
      { path: 'users', loadChildren: () => import('./views/admin-users/admin-users.module')
          .then(m => m.AdminUsersModule) },
    ] }
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [ RouterModule.forChild(routes), ...CORE_MODULES ],
  exports: [...COMPONENTS]
})
export class AdminModule { }
