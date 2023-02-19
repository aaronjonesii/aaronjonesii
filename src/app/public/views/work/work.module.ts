import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { WorkComponent } from "./work.component";
import { MatChipsModule } from "@angular/material/chips";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";

const ANGULAR_MATERIAL_MODULES = [
  MatChipsModule, MatCardModule, MatIconModule,
  MatButtonModule, MatDividerModule,
];

const CORE_MODULES = [CommonModule];

const COMPONENTS = [WorkComponent];

const routes: Routes = [
  { path: '', component: WorkComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [ RouterModule.forChild(routes), ...CORE_MODULES, ...ANGULAR_MATERIAL_MODULES ],
  exports: [...COMPONENTS]
})
export class WorkModule { }
