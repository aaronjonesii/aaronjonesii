import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';

const ANGULAR_MATERIAL_MODULES = []!;

const COMPONENTS = [HomeComponent];

export const home_nav_path = {};

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    RouterModule.forChild(routes), CommonModule,
    ...ANGULAR_MATERIAL_MODULES
  ],
  exports: [RouterModule]
})
export class HomeModule { }
