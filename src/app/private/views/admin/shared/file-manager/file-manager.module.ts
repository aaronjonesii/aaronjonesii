import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileManagerComponent } from './file-manager.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NewFolderDialogComponent } from './components/new-folder-dialog/new-folder-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { AllItemsPipe } from './pipes/all-items.pipe';
import { FormatBytesPipe } from './pipes/format-bytes.pipe';
import { StorageItemIconComponent } from './components/storage-item-icon/storage-item-icon.component';
import { StorageFilePreviewComponent } from './components/storage-file-preview/storage-file-preview.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DeleteFilesDialogComponent } from './components/delete-files-dialog/delete-files-dialog.component';
import { FileDropzoneDirective } from './directives/file-dropzone.directive';
import { SharedModule } from "../../../../../shared/shared.module";

const PIPES = [AllItemsPipe, FormatBytesPipe];

const ANGULAR_MATERIAL_MODULES = [
  MatButtonModule, MatIconModule,
  MatTableModule, MatCheckboxModule,
  MatFormFieldModule, MatInputModule,
  MatDialogModule, MatTooltipModule
];

const CORE_MODULES = [CommonModule, FormsModule];

const DIRECTIVES = [FileDropzoneDirective];

const COMPONENTS = [
  FileManagerComponent, NewFolderDialogComponent,
  StorageItemIconComponent, StorageFilePreviewComponent,
  DeleteFilesDialogComponent
];

@NgModule({
  declarations: [...COMPONENTS, ...DIRECTIVES, ...PIPES, FileDropzoneDirective],
  imports: [
    ...CORE_MODULES, ...ANGULAR_MATERIAL_MODULES, SharedModule
  ],
  exports: [...COMPONENTS, ...DIRECTIVES]
})
export class FileManagerModule { }
