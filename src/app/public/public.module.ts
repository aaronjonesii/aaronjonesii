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
  about: '/about',
  auth: '/auth', ...auth_nav_path,
  contact: '/contact',
  policies: '/policies', ...policies_nav_path,
  work: '/work'
};

const routes: Routes = [
  { path: '', component: LayoutComponent, children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'about', loadChildren: () => import('./views/about/about.module').then(m => m.AboutModule) },
      { path: 'auth', loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthModule) },
      { path: 'contact', loadChildren: () => import('./views/contact/contact.module').then(m => m.ContactModule) },
      { path: 'work', loadChildren: () => import('./views/work/work.module').then(m => m.WorkModule) },
    ] },
  { path: 'policies', loadChildren: () => import('./views/policies/policies.module').then(m => m.PoliciesModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicModule { }
