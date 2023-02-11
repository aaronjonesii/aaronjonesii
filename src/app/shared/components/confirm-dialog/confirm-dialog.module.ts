import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from "./confirm-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";

const ANGULAR_MATERIAL_MODULES = [
  MatDialogModule, MatButtonModule
];

const CORE_MODULES = [CommonModule];

const COMPONENTS = [ConfirmDialogComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...CORE_MODULES, ...ANGULAR_MATERIAL_MODULES],
  exports: [...COMPONENTS]
})
export class ConfirmDialogModule { }
