import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from './pipes/safe.pipe';
import { SlugifyPipe } from "./pipes/slugify.pipe";
import { LoadingComponent } from "./components/loading/loading.component";
import { LoadingOrErrorComponent } from "./components/loading-or-error/loading-or-error.component";
import { UserPhotoComponent } from "./components/user-photo/user-photo.component";
import { MatIconModule } from "@angular/material/icon";

const ANGULAR_MATERIAL_MODULES = [MatIconModule];

const CORE_MODULES = [CommonModule];

const COMPONENTS = [LoadingComponent, LoadingOrErrorComponent, UserPhotoComponent];

const PIPES = [SafePipe, SlugifyPipe];

@NgModule({
  providers: [...PIPES],
  imports: [...CORE_MODULES, ...ANGULAR_MATERIAL_MODULES],
  declarations: [...COMPONENTS, ...PIPES],
  exports: [...COMPONENTS, ...PIPES]
})
export class SharedModule { }
