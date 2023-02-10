import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { home_nav_path } from './views/home/home.module';
import { auth_nav_path } from "./views/auth/auth.module";
import { policies_nav_path } from "./views/policies/policies.module";

export const public_nav_path = {
  home: '/', ...home_nav_path,
  comingSoon: '/coming-soon',
  auth: '/auth', ...auth_nav_path,
  policies: '/policies', ...policies_nav_path
};

const routes: Routes = [
  { path: '', loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule) },
  { path: 'auth', loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthModule) },
  { path: 'policies', loadChildren: () => import('./views/policies/policies.module').then(m => m.PoliciesModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicModule { }
