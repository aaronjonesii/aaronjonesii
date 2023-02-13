import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminEditorComponent } from "./admin-editor.component";
import { FormsModule } from "@angular/forms";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";

const ANGULAR_MATERIAL_MODULES = []!;

const CORE_MODULES = [CommonModule, FormsModule];

const COMPONENTS = [AdminEditorComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...CORE_MODULES, ...ANGULAR_MATERIAL_MODULES, CKEditorModule],
  exports: [...COMPONENTS]
})
export class AdminEditorModule { }
