import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { admin_nav_path } from "./views/admin/admin.module";
import { AdminGuard } from "../core/guards/admin.guard";
import { AuthGuard } from "../core/guards/auth.guard";
import { LayoutComponent } from "../shared/components/layout/layout.component";

export const private_nav_path = {
  admin: '/admin', ...admin_nav_path,
  accountDetails: '/account-details',
};

const routes: Routes = [
  { path: 'admin', loadChildren: () => import('./views/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AdminGuard] },
  { path: '', component: LayoutComponent, children: [
      { path: 'account-details', loadChildren: () => import('./views/account-details/account-details.module')
          .then(m => m.AccountDetailsModule), canActivate: [AuthGuard] },
    ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateModule { }
