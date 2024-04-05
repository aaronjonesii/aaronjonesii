import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { AdminDashboardComponent } from "./admin-dashboard.component";
import { MasonryCardsModule } from "../../../../../shared/components/masonry-cards/masonry-cards.module";
import { TopAppBarComponent } from "../../../../../shared/components/top-app-bar/top-app-bar.component";

const CORE_MODULES = [CommonModule];

const COMPONENTS = []!;

const routes: Routes = [
  { path: '', component: AdminDashboardComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    RouterModule.forChild(routes), ...CORE_MODULES,
    MasonryCardsModule, TopAppBarComponent,
  ],
  exports: [...COMPONENTS]
})
export class AdminDashboardModule { }
