import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { AccountDetailsComponent } from "./account-details.component";

const ANGULAR_MATERIAL_MODULES = []!;

const CORE_MODULES = [CommonModule]!;

const COMPONENTS = []!;

const routes: Routes = [
  { path: '', component: AccountDetailsComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    RouterModule.forChild(routes), ...CORE_MODULES, ...ANGULAR_MATERIAL_MODULES,
  ],
  exports: [...COMPONENTS]
})
export class AccountDetailsModule { }
