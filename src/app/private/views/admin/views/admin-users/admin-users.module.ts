import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { AdminUsersComponent } from "./admin-users.component";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatTooltipModule } from "@angular/material/tooltip";
import { AdminUserDetailComponent } from './admin-user-detail/admin-user-detail.component';
import { SharedModule } from "../../../../../shared/shared.module";
import { TopAppBarModule } from "../../../../../shared/components/top-app-bar/top-app-bar.module";
import { MatDialogModule } from "@angular/material/dialog";
import { ConfirmDialogModule } from "../../../../../shared/components/confirm-dialog/confirm-dialog.module";

const ANGULAR_MATERIAL_MODULES = [
  MatListModule, MatIconModule, MatButtonModule,
  MatMenuModule, MatTooltipModule, MatDialogModule,
];

const CORE_MODULES = [CommonModule];

const COMPONENTS = [AdminUsersComponent, AdminUserDetailComponent];

const routes: Routes = [
  { path: '', component: AdminUsersComponent, pathMatch: 'full' },
  { path: ':userUID', component: AdminUserDetailComponent }
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    RouterModule.forChild(routes), ...CORE_MODULES,
    ...ANGULAR_MATERIAL_MODULES, SharedModule, TopAppBarModule,
    ConfirmDialogModule,
  ],
  exports: [...COMPONENTS]
})
export class AdminUsersModule { }
