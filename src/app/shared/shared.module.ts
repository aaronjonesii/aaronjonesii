import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from './pipes/safe.pipe';
import { SlugifyPipe } from "./pipes/slugify.pipe";

const ANGULAR_MATERIAL_MODULES = []!;

const CORE_MODULES = [CommonModule];

const COMPONENTS = []!;

const PIPES = [SafePipe, SlugifyPipe];
const DIRECTIVES = []!;

@NgModule({
  providers: [...PIPES],
  imports: [...CORE_MODULES, ...ANGULAR_MATERIAL_MODULES],
  declarations: [...COMPONENTS, ...PIPES, ...DIRECTIVES],
  exports: [...COMPONENTS, ...PIPES, ...DIRECTIVES]
})
export class SharedModule { }
