import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { ComingSoonComponent } from "./coming-soon.component";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

const ANGULAR_MATERIAL_MODULES = [
  MatButtonModule, MatIconModule
];

const CORE_MODULES = [CommonModule];

const COMPONENTS = [ComingSoonComponent];

const routes: Routes = [
  { path: '', component: ComingSoonComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [RouterModule.forChild(routes), ...CORE_MODULES, ...ANGULAR_MATERIAL_MODULES],
  exports: [...COMPONENTS]
})
export class ComingSoonModule { }
