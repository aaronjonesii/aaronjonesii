import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopAppBarComponent } from "./top-app-bar.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";

const ANGULAR_MATERIAL_MODULES = [
  MatToolbarModule, MatButtonModule, MatIconModule
];

const CORE_MODULES = [CommonModule, RouterModule];

const COMPONENTS = [TopAppBarComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...CORE_MODULES, ...ANGULAR_MATERIAL_MODULES],
  exports: [...COMPONENTS]
})
export class TopAppBarModule { }
