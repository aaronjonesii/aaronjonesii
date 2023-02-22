import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { WorkComponent } from "./work.component";
import { MatChipsModule } from "@angular/material/chips";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { SharedModule } from "../../../shared/shared.module";
import { ConfirmDialogModule } from "../../../shared/components/confirm-dialog/confirm-dialog.module";
import { MatTabsModule } from "@angular/material/tabs";
import { CommentsDialogModule } from "./project-detail/comments-dialog/comments-dialog.module";
import { ProjectDetailCommentComponent } from './project-detail/project-detail-comment/project-detail-comment.component';

const ANGULAR_MATERIAL_MODULES = [
  MatChipsModule, MatCardModule, MatIconModule,
  MatButtonModule, MatDividerModule, MatTabsModule,
];

const CORE_MODULES = [CommonModule];

const COMPONENTS = [
  WorkComponent,
  ProjectDetailComponent, ProjectDetailCommentComponent,
];

const routes: Routes = [
  { path: '', component: WorkComponent, pathMatch: 'full' },
  { path: ':projectID', component: ProjectDetailComponent },
];

@NgModule({
  providers: [],
  declarations: [...COMPONENTS],
  imports: [
    RouterModule.forChild(routes), ...CORE_MODULES, ...ANGULAR_MATERIAL_MODULES,
    SharedModule, ConfirmDialogModule, CommentsDialogModule,
  ],
  exports: [...COMPONENTS]
})
export class WorkModule { }
