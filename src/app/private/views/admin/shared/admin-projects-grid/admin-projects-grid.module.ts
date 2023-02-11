import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProjectsGridComponent } from "./admin-projects-grid.component";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { RouterModule } from "@angular/router";
import { MatTooltipModule } from "@angular/material/tooltip";

const ANGULAR_MATERIAL_MODULES = [
  MatCheckboxModule, MatIconModule,
  MatButtonModule, MatMenuModule,
  MatTooltipModule
];

const CORE_MODULES = [CommonModule, RouterModule];

const COMPONENTS = [AdminProjectsGridComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...CORE_MODULES, ...ANGULAR_MATERIAL_MODULES],
  exports: [...COMPONENTS]
})
export class AdminProjectsGridModule { }
