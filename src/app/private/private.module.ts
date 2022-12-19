import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const private_nav_path = {};

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateModule { }
