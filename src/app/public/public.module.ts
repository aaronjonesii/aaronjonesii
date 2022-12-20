import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { home_nav_path } from './views/home/home.module';

export const public_nav_path = {
  home: '/', ...home_nav_path,
  comingSoon: '/coming-soon'
};

const routes: Routes = [
  { path: '', loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicModule { }
