import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { home_nav_path } from './views/home/home.module';
import { auth_nav_path } from "./views/auth/auth.module";
import { policies_nav_path } from "./views/policies/policies.module";
import { LayoutComponent } from "../shared/components/layout/layout.component";
import { HomeComponent } from "./views/home/home.component";

export const public_nav_path = {
  home: '/', ...home_nav_path,
  comingSoon: '/coming-soon',
  auth: '/auth', ...auth_nav_path,
  policies: '/policies', ...policies_nav_path
};

const routes: Routes = [
  { path: '', component: LayoutComponent, children: [
      { path: '', component: HomeComponent, pathMatch: 'full' }
    ] },
  { path: 'auth', loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthModule) },
  { path: 'policies', loadChildren: () => import('./views/policies/policies.module').then(m => m.PoliciesModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicModule { }
