import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { AdminProjectsComponent } from "./admin-projects.component";
import { EditProjectComponent } from "./edit-project/edit-project.component";
import { TopAppBarModule } from "../../../../../shared/components/top-app-bar/top-app-bar.module";
import { AdminProjectsGridModule } from "../../shared/admin-projects-grid/admin-projects-grid.module";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { AddProjectComponent } from "./add-project/add-project.component";
import { ProjectImageComponent } from "./project-image/project-image.component";
import { ProjectTagsComponent } from "./project-tags/project-tags.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { SharedModule } from "../../../../../shared/shared.module";
import { MatChipsModule } from "@angular/material/chips";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { ConfirmDialogModule } from "../../../../../shared/components/confirm-dialog/confirm-dialog.module";
import { AdminEditorComponent } from "../../shared/admin-editor/admin-editor.component";

const ANGULAR_MATERIAL_MODULES = [
  MatButtonModule, MatIconModule, MatFormFieldModule,
  MatInputModule, MatSelectModule, MatCheckboxModule,
  MatChipsModule, MatAutocompleteModule,
];

const CORE_MODULES = [CommonModule, ReactiveFormsModule];

const COMPONENTS = [
  AdminProjectsComponent, AddProjectComponent,
  EditProjectComponent, ProjectImageComponent,
  ProjectTagsComponent,
];

const routes: Routes = [
  { path: '', component: AdminProjectsComponent, pathMatch: 'full' },
  { path: 'add', component: AddProjectComponent },
  { path: ':projectID/edit', component: EditProjectComponent },
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    RouterModule.forChild(routes), ...CORE_MODULES, ...ANGULAR_MATERIAL_MODULES,
    AdminEditorComponent, AdminProjectsGridModule, ConfirmDialogModule, SharedModule,
    TopAppBarModule,
  ],
  exports: [...COMPONENTS]
})
export class AdminProjectsModule { }
