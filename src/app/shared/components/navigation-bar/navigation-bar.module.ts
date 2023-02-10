import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from "./navigation-bar.component";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink, RouterModule } from "@angular/router";

const ANGULAR_MATERIAL_MODULES = [
  MatButtonModule, MatIconModule
];

const CORE_MODULES = [CommonModule, RouterModule];

const COMPONENTS = [NavigationBarComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [ ...CORE_MODULES, ...ANGULAR_MATERIAL_MODULES, RouterLink ],
  exports: [...COMPONENTS]
})
export class NavigationBarModule { }
