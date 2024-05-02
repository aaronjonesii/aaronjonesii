import { Component, Input, OnInit } from '@angular/core';
import { FirebaseStorageService } from './services/firebase-storage.service';
import { StorageReference, UploadResult } from '@angular/fire/storage';
import { FirebaseError } from '@angular/fire/app/firebase';
import { MatDialog } from '@angular/material/dialog';
import {
  NewFolderDialogComponent,
} from './components/new-folder-dialog/new-folder-dialog.component';
import { StorageItem } from './interfaces/storage-item';
import { SelectionModel } from '@angular/cdk/collections';
import { StorageFile } from './interfaces/storage-file';
import {
  DeleteFilesDialogComponent,
} from './components/delete-files-dialog/delete-files-dialog.component';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  StorageItemIconComponent,
} from './components/storage-item-icon/storage-item-icon.component';
import { FormatBytesPipe } from './pipes/format-bytes.pipe';
import {
  StorageFilePreviewComponent,
} from './components/storage-file-preview/storage-file-preview.component';
import { FileDropzoneDirective } from './directives/file-dropzone.directive';
// eslint-disable-next-line max-len
import { LoadingOrErrorComponent } from '../../../../shared/components/loading-or-error/loading-or-error.component';
import { appInformation } from '../../../../information';
import {
  ConsoleLoggerService,
} from '../../../../shared/services/console-logger.service';

@Component({
  selector: 'aj-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrl: './file-manager.component.scss',
  standalone: true,
  imports: [
    AsyncPipe,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule,
    StorageItemIconComponent,
    FormatBytesPipe,
    DatePipe,
    StorageFilePreviewComponent,
    FileDropzoneDirective,
    LoadingOrErrorComponent,
  ],
})
export class FileManagerComponent implements OnInit {
  tableColumns: string[] = ['checkbox', 'name', 'size', 'type', 'lastModified'];
  items$?: Promise<StorageItem[]> | undefined;
  currentPath = '';
  error?: FirebaseError;
  company = appInformation;
  @Input() selection = new SelectionModel<StorageItem>(true, []);
  selectedFile: StorageFile | undefined;

  constructor(
    private storageService: FirebaseStorageService,
    private dialog: MatDialog,
    private logger: ConsoleLoggerService,
  ) {}

  ngOnInit() {
    this.items$ = this.getAllStorageItems(this.currentPath);
  }

  toggleAllItems(checked: boolean, items: StorageItem[]) {
    if (!checked) {
      this.selection.clear();
      return;
    }
    this.selection.select(...items);
  }
  allItemsSelected(items: StorageItem[]): boolean {
    return this.selection.selected.length === items.length &&
      this.selection.selected.length > 0;
  }
  allItemsIndeterminate(items: StorageItem[]): boolean {
    return this.selection.selected.length > 0 &&
      this.selection.selected.length < items.length;
  }
  storageItemSelected(item: StorageItem) {
    if (item.type === 'folder') this.setStoragePath(item.fullPath);
    else if (item.type === 'file') this.selectedFile = item;
  }
  selectionIncludesFolder(): boolean {
    return this.selection.selected.some((item) => item.type === 'folder');
  }

  deleteItems(items: StorageItem[]) {
    const dialogRef = this.dialog.open(DeleteFilesDialogComponent, {
      minWidth: '250px',
    });
    dialogRef.afterClosed().forEach((result) => {
        if (result) {
          this.storageService.deleteFiles(items)
            .then(() => {
              this.selection.clear();
              if (items.some((item) => item == this.selectedFile)) {
                this.selectedFile = undefined;
              }
            })
            .then(() => this.reload(this.currentPath));
        }
      });
  }

  getCrumbPath(pathArray: string[], index: number): string {
    pathArray.length = index + 1;
    return pathArray.join('/');
  }

  setStoragePath(path: string) {
    this.items$ = this.getAllStorageItems(path);
    this.currentPath = path;
    if (this.selection.hasValue()) this.selection.clear();
  }

  async getAllStorageItems(path: string): Promise<StorageItem[]> {
    const storageRef: StorageReference = this.storageService.getRef(path);
    return this.storageService.listAll(storageRef)
      .then(async ({ items, prefixes }) => {
        const allItems: StorageItem[] = [
          ...prefixes.map(this.storageService.importFolder),
          ...(await Promise.all(items.map(this.storageService.importFile))),
        ];
        return allItems;
      })
      .catch((error: FirebaseError) => {
        this.error = error;
        return new Promise(() => undefined);
      });
  }

  reload(path: string | null = null) {
    let pathRef: StorageReference;
    if (path) pathRef = this.storageService.getRef(path);
    else pathRef = this.storageService.getRef(this.currentPath);

    this.items$ = this.storageService.listAll(pathRef)
      .then(async ({ items, prefixes }) => [
        ...prefixes.map(this.storageService.importFolder),
        ...(await Promise.all(items.map(this.storageService.importFile))),
      ]);
  }

  createNewFolder() {
    const dialogRef = this.dialog.open(NewFolderDialogComponent, {
      width: '250px',
      data: { folder: { path: this.currentPath } },
    });
    dialogRef.afterClosed().forEach((folderName) => {
      if (folderName) {
        const path = `${this.currentPath ?
          this.currentPath+'/' : ''}${folderName}`;
        this.setStoragePath(path);
      }
    });
  }

  async uploadItems(files?: FileList): Promise<void> {
    if (!files) return;

    // prevent file names to have ","(comma)
    if (Array.from(files).some((file) => file.name.includes(','))) {
      this.logger.warn(`File names cannot include a ","(comma)`);
      return;
    }

    const uploadedFiles: UploadResult[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileRef = await this.storageService.getRef(
        `${this.currentPath}/${file.name}`,
      );
      await this.storageService.uploadFile(fileRef, file)
        .then((snapshot) => uploadedFiles.push(snapshot))
        .catch((error) => {
          this.logger.error(`error uploading file: '${file}'`, error);
        });
    }
    this.reload(this.currentPath);
    // eslint-disable-next-line max-len
    this.logger.info(`uploaded ${uploadedFiles.length} ${uploadedFiles.length === 1 ? 'file' : 'files'}`, uploadedFiles);
  }

  async onFilesSelect($event: Event): Promise<void> {
    const files: FileList = (<HTMLInputElement>$event.target).files as FileList;
    await this.uploadItems(files);
  }

  async openAllFiles(items: StorageItem[]) {
    await this.storageService.openAllFiles(items);
  }
}
