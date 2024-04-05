import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { AdminFileManagerComponent } from "./admin-file-manager.component";
import { FileManagerModule } from "../../shared/file-manager/file-manager.module";
import { TopAppBarComponent } from "../../../../../shared/components/top-app-bar/top-app-bar.component";

const CORE_MODULES = [CommonModule];

const COMPONENTS = [AdminFileManagerComponent];

const routes: Routes = [
  { path: '', component: AdminFileManagerComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    RouterModule.forChild(routes), ...CORE_MODULES,
    FileManagerModule, TopAppBarComponent,
  ],
  exports: [...COMPONENTS]
})
export class AdminFileManagerModule { }
