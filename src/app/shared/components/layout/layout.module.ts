import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from "./layout.component";
import { NavigationBarModule } from "../navigation-bar/navigation-bar.module";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "../../shared.module";
import { NavigationRailModule } from "../navigation-rail/navigation-rail.module";
import { NavigationDrawerModule } from "../navigation-drawer/navigation-drawer.module";
import { TopAppBarModule } from "../top-app-bar/top-app-bar.module";

const ANGULAR_MATERIAL_MODULES = [
  MatToolbarModule, MatButtonModule, MatIconModule,
];

const CORE_MODULES = [CommonModule, RouterModule];

const COMPONENTS = [LayoutComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    ...CORE_MODULES, ...ANGULAR_MATERIAL_MODULES,
    NavigationBarModule, SharedModule, NavigationRailModule,
    NavigationDrawerModule, TopAppBarModule,
  ],
  exports: [...COMPONENTS]
})
export class LayoutModule { }
