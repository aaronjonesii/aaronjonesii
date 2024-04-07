import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from "../../../shared/components/layout/layout.module";
import { LayoutComponent } from "../../../shared/components/layout/layout.component";

const ANGULAR_MATERIAL_MODULES = [
  MatButtonModule
];

const COMPONENTS = []!;

export const error_nav_path = {
  pageNotFound: '/error/404',
  forbidden: '/error/403'
};

const routes: Routes = [
  { path: '', component: LayoutComponent, children: [
      {
        path: 'error/404',
        loadComponent: () => import('./page-not-found/page-not-found.component')
          .then((m) => m.PageNotFoundComponent),
      },
      {
        path: 'error/403',
        loadComponent: () => import('./forbidden/forbidden.component')
          .then((m) => m.ForbiddenComponent),
      },
      {
        path: '**',
        loadComponent: () => import('./page-not-found/page-not-found.component')
          .then((m) => m.PageNotFoundComponent),
      }
    ],
  },
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [RouterModule.forChild(routes), CommonModule, ...ANGULAR_MATERIAL_MODULES, LayoutModule],
  exports: [RouterModule]
})
export class ErrorsModule {}
