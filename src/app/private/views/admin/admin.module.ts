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
import { AddProjectComponent } from './views/admin-projects/add-project/add-project.component';
import { TopAppBarModule } from "../../../shared/components/top-app-bar/top-app-bar.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { ReactiveFormsModule } from "@angular/forms";
import { ProjectImageComponent } from './views/admin-projects/project-image/project-image.component';
import { SharedModule } from "../../../shared/shared.module";
import { MatChipsModule } from "@angular/material/chips";
import { ProjectTagsComponent } from './views/admin-projects/project-tags/project-tags.component';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatSelectModule } from "@angular/material/select";

const ANGULAR_MATERIAL_MODULES = [
  MatToolbarModule, MatButtonModule, MatMenuModule,
  MatIconModule, MatFormFieldModule, MatInputModule,
  MatCheckboxModule, MatChipsModule, MatAutocompleteModule,
  MatSelectModule
];

const CORE_MODULES = [CommonModule, ReactiveFormsModule];

const COMPONENTS = [
  AdminComponent, AdminDashboardComponent,
  AdminProjectsComponent, AddProjectComponent,
  ProjectImageComponent, ProjectTagsComponent
];

export const admin_nav_path = {
  adminDashboard: '/admin/dashboard',
  adminProjects: '/admin/projects',
  adminAddProject: '/admin/projects/add'
};

const routes: Routes = [
  { path: '', component: AdminComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'projects', component: AdminProjectsComponent },
      { path: 'projects/add', component: AddProjectComponent }
    ] }
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    RouterModule.forChild(routes), ...CORE_MODULES,
    ...ANGULAR_MATERIAL_MODULES, NavigationBarModule,
    MasonryCardsModule, ConfirmDialogModule, AdminProjectsGridModule,
    TopAppBarModule, SharedModule
  ],
  exports: [...COMPONENTS]
})
export class AdminModule { }
