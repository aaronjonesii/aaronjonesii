import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from "@angular/material/card";
import { RouterModule } from "@angular/router";

const ANGULAR_MATERIAL_MODULES = [MatCardModule];

const CORE_MODULES = [CommonModule, RouterModule];

const COMPONENTS = []!;

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...CORE_MODULES, ...ANGULAR_MATERIAL_MODULES],
  exports: [...COMPONENTS]
})
export class MasonryCardsModule { }
