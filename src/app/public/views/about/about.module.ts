import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { AboutComponent } from "./about.component";

const CORE_MODULES = [CommonModule];

const COMPONENTS = []!;

const routes: Routes = [
  { path: '', component: AboutComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [RouterModule.forChild(routes), ...CORE_MODULES],
  exports: [...COMPONENTS]
})
export class AboutModule { }
