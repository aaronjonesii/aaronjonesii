import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { AdminFileManagerComponent } from "./admin-file-manager.component";
import { TopAppBarModule } from "../../../../../shared/components/top-app-bar/top-app-bar.module";
import { FileManagerModule } from "../../shared/file-manager/file-manager.module";

const CORE_MODULES = [CommonModule];

const COMPONENTS = [AdminFileManagerComponent];

const routes: Routes = [
  { path: '', component: AdminFileManagerComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    RouterModule.forChild(routes), ...CORE_MODULES,
    TopAppBarModule, FileManagerModule,
  ],
  exports: [...COMPONENTS]
})
export class AdminFileManagerModule { }
