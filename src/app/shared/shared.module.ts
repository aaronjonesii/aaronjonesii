import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from "@angular/material/icon";

const ANGULAR_MATERIAL_MODULES = [MatIconModule];

const CORE_MODULES = [CommonModule];

const COMPONENTS = []!;

const PIPES = []!;

@NgModule({
  providers: [...PIPES],
  imports: [...CORE_MODULES, ...ANGULAR_MATERIAL_MODULES],
  declarations: [...COMPONENTS, ...PIPES],
  exports: [...COMPONENTS, ...PIPES]
})
export class SharedModule { }
