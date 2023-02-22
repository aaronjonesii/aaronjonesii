import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsDialogComponent } from "./comments-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { SharedModule } from "../../../../../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { MatMenuModule } from "@angular/material/menu";
import { CommentsDialogCommentComponent } from './comments-dialog-comment/comments-dialog-comment.component';

const ANGULAR_MATERIAL_MODULES = [
  MatDialogModule, MatButtonModule, MatIconModule,
  MatFormFieldModule, MatInputModule, MatMenuModule,
];

const CORE_MODULES = [CommonModule, ReactiveFormsModule];

const COMPONENTS = [CommentsDialogComponent, CommentsDialogCommentComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...CORE_MODULES, ...ANGULAR_MATERIAL_MODULES, SharedModule],
  exports: [...COMPONENTS]
})
export class CommentsDialogModule { }
