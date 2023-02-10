import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { admin_nav_path } from "./views/admin/admin.module";
import { AdminGuard } from "../core/guards/admin.guard";

export const private_nav_path = {
  admin: '/admin', ...admin_nav_path
};

const routes: Routes = [
  { path: 'admin', loadChildren: () => import('./views/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AdminGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateModule { }
