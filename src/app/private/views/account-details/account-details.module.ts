import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { AccountDetailsComponent } from "./account-details.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { PhotoUploadComponent } from "./photo-upload/photo-upload.component";
import { SharedModule } from "../../../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";

const ANGULAR_MATERIAL_MODULES = [
  MatFormFieldModule, MatInputModule,
  MatButtonModule, MatIconModule,
];

const CORE_MODULES = [CommonModule, ReactiveFormsModule];

const COMPONENTS = [AccountDetailsComponent, PhotoUploadComponent];

const routes: Routes = [
  { path: '', component: AccountDetailsComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    RouterModule.forChild(routes), ...CORE_MODULES, ...ANGULAR_MATERIAL_MODULES,
    SharedModule // PhotoUploadComponent
  ],
  exports: [...COMPONENTS]
})
export class AccountDetailsModule { }
