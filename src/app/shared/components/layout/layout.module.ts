import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from "./layout.component";
import { NavigationBarModule } from "../navigation-bar/navigation-bar.module";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "../../shared.module";
import { MatSidenavModule } from "@angular/material/sidenav";
import { NavigationRailModule } from "../navigation-rail/navigation-rail.module";

const ANGULAR_MATERIAL_MODULES = [
  MatToolbarModule, MatButtonModule, MatIconModule,
  MatSidenavModule,
];

const CORE_MODULES = [CommonModule, RouterModule];

const COMPONENTS = [LayoutComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    ...CORE_MODULES, ...ANGULAR_MATERIAL_MODULES,
    NavigationBarModule, SharedModule, NavigationRailModule,
  ],
  exports: [...COMPONENTS]
})
export class LayoutModule { }
