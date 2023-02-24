import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { ContactComponent } from "./contact.component";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressBarModule } from "@angular/material/progress-bar";

const ANGULAR_MATERIAL_MODULES = [
  MatIconModule, MatFormFieldModule, MatInputModule,
  MatButtonModule, MatProgressBarModule,
];

const CORE_MODULES = [CommonModule, ReactiveFormsModule];

const COMPONENTS = [ContactComponent];

const routes: Routes = [
  { path: '', component: ContactComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [RouterModule.forChild(routes), ...CORE_MODULES, ...ANGULAR_MATERIAL_MODULES],
  exports: [...COMPONENTS]
})
export class ContactModule { }
