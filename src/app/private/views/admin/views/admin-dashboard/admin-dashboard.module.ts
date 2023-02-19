import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { AdminDashboardComponent } from "./admin-dashboard.component";
import { TopAppBarModule } from "../../../../../shared/components/top-app-bar/top-app-bar.module";
import { MasonryCardsModule } from "../../../../../shared/components/masonry-cards/masonry-cards.module";

const CORE_MODULES = [CommonModule];

const COMPONENTS = [AdminDashboardComponent];

const routes: Routes = [
  { path: '', component: AdminDashboardComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    RouterModule.forChild(routes), ...CORE_MODULES,
    TopAppBarModule, MasonryCardsModule
  ],
  exports: [...COMPONENTS]
})
export class AdminDashboardModule { }
