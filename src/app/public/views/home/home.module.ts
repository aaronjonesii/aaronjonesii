import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { NavigationBarModule } from "../../../shared/components/navigation-bar/navigation-bar.module";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";

const ANGULAR_MATERIAL_MODULES = [
  MatButtonModule, MatIconModule, MatCardModule,
];

const COMPONENTS = [HomeComponent];

export const home_nav_path = {};

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    RouterModule.forChild(routes), CommonModule,
    ...ANGULAR_MATERIAL_MODULES, NavigationBarModule
  ],
  exports: [RouterModule]
})
export class HomeModule { }
