import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { public_nav_path } from './public/public.module';
import { private_nav_path } from './private/private.module';
import { error_nav_path } from './core/components/errors/errors.module';

export const nav_path = {
  ...public_nav_path,
  ...private_nav_path,
  ...error_nav_path
};

const routes: Routes = [
  { path: '', loadChildren: () => import('./public/public.module').then(m => m.PublicModule) },
  { path: '', loadChildren: () => import('./private/private.module').then(m => m.PrivateModule) },
  { path: '', loadChildren: () => import('./core/components/errors/errors.module').then(m => m.ErrorsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    initialNavigation: 'enabledBlocking',
    scrollPositionRestoration: 'top',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
