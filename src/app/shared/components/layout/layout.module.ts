import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "../../shared.module";
import { TopAppBarComponent } from "../top-app-bar/top-app-bar.component";

const ANGULAR_MATERIAL_MODULES = [
  MatToolbarModule, MatButtonModule, MatIconModule,
];

const CORE_MODULES = [CommonModule, RouterModule];

const COMPONENTS = []!;

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    ...CORE_MODULES, ...ANGULAR_MATERIAL_MODULES,
    SharedModule, TopAppBarComponent,
  ],
  exports: [...COMPONENTS]
})
export class LayoutModule { }
