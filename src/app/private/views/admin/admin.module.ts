import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { AdminDashboardComponent } from './views/admin-dashboard/admin-dashboard.component';
import { NavigationBarModule } from "../../../shared/components/navigation-bar/navigation-bar.module";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MasonryCardsModule } from "../../../shared/components/masonry-cards/masonry-cards.module";
import { AdminProjectsComponent } from './views/admin-projects/admin-projects.component';
import { ConfirmDialogModule } from "../../../shared/components/confirm-dialog/confirm-dialog.module";
import { MatMenuModule } from "@angular/material/menu";
import { AdminProjectsGridModule } from "./shared/admin-projects-grid/admin-projects-grid.module";
import { MatIconModule } from "@angular/material/icon";

const ANGULAR_MATERIAL_MODULES = [
  MatToolbarModule, MatButtonModule, MatMenuModule,
  MatIconModule
];

const CORE_MODULES = [CommonModule];

const COMPONENTS = [
  AdminComponent, AdminDashboardComponent,
  AdminProjectsComponent
];

export const admin_nav_path = {
  adminDashboard: '/admin/dashboard',
  adminProjects: '/admin/projects'
};

const routes: Routes = [
  { path: '', component: AdminComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'projects', component: AdminProjectsComponent }
    ] }
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    RouterModule.forChild(routes), ...CORE_MODULES,
    ...ANGULAR_MATERIAL_MODULES, NavigationBarModule,
    MasonryCardsModule, ConfirmDialogModule, AdminProjectsGridModule
  ],
  exports: [...COMPONENTS]
})
export class AdminModule { }
