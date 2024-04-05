import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlugifyPipe } from "./pipes/slugify.pipe";
import { MatIconModule } from "@angular/material/icon";

const ANGULAR_MATERIAL_MODULES = [MatIconModule];

const CORE_MODULES = [CommonModule];

const COMPONENTS = []!;

const PIPES = [SlugifyPipe];

@NgModule({
  providers: [...PIPES],
  imports: [...CORE_MODULES, ...ANGULAR_MATERIAL_MODULES],
  declarations: [...COMPONENTS, ...PIPES],
  exports: [...COMPONENTS, ...PIPES]
})
export class SharedModule { }
