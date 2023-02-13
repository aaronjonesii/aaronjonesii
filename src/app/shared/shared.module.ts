import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from './pipes/safe.pipe';
import { SlugifyPipe } from "./pipes/slugify.pipe";
import { LoadingComponent } from "./components/loading/loading.component";

const ANGULAR_MATERIAL_MODULES = []!;

const CORE_MODULES = [CommonModule];

const COMPONENTS = [LoadingComponent];

const PIPES = [SafePipe, SlugifyPipe];
const DIRECTIVES = []!;

@NgModule({
  providers: [...PIPES],
  imports: [...CORE_MODULES, ...ANGULAR_MATERIAL_MODULES],
  declarations: [...COMPONENTS, ...PIPES, ...DIRECTIVES],
  exports: [...COMPONENTS, ...PIPES, ...DIRECTIVES]
})
export class SharedModule { }
