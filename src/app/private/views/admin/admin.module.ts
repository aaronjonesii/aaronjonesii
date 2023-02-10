import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { AdminDashboardComponent } from './views/admin-dashboard/admin-dashboard.component';
import { NavigationBarModule } from "../../../shared/components/navigation-bar/navigation-bar.module";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MasonryCardsModule } from "../../../shared/components/masonry-cards/masonry-cards.module";

const ANGULAR_MATERIAL_MODULES = [
  MatToolbarModule, MatButtonModule
];

const CORE_MODULES = [CommonModule];

const COMPONENTS = [AdminComponent, AdminDashboardComponent];

export const admin_nav_path = {
  adminDashboard: '/admin/dashboard'
};

const routes: Routes = [
  { path: '', component: AdminComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
    ] }
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    RouterModule.forChild(routes), ...CORE_MODULES,
    ...ANGULAR_MATERIAL_MODULES, NavigationBarModule,
    MasonryCardsModule
  ],
  exports: [...COMPONENTS]
})
export class AdminModule { }
