import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationDrawerComponent } from "./navigation-drawer.component";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";

const ANGULAR_MATERIAL_MODULES = [
  MatButtonModule, MatIconModule,
];

const CORE_MODULES = [CommonModule, RouterModule];

const COMPONENTS = [NavigationDrawerComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...CORE_MODULES, ...ANGULAR_MATERIAL_MODULES],
  exports: [...COMPONENTS]
})
export class NavigationDrawerModule { }
