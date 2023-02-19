import { Component, Input, OnInit } from '@angular/core';
import { FirebaseStorageService } from './services/firebase-storage.service';
import { StorageReference, UploadResult } from '@angular/fire/storage';
import { FirebaseError } from '@angular/fire/app/firebase';
import { MatDialog } from '@angular/material/dialog';
import { NewFolderDialogComponent } from './components/new-folder-dialog/new-folder-dialog.component';
import { StorageItem } from './interfaces/storage-item';
import { SelectionModel } from '@angular/cdk/collections';
import { StorageFile } from './interfaces/storage-file';
import { DeleteFilesDialogComponent } from './components/delete-files-dialog/delete-files-dialog.component';
import { appInformation } from "../../../../../information";
import { ConsoleLoggerService } from "../../../../../core/services/console-logger.service";

@Component({
  selector: 'aj-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.scss']
})
export class FileManagerComponent implements OnInit {
  tableColumns: string[] = ['checkbox', 'name', 'size', 'type', 'lastModified'];
  public items$?: Promise<StorageItem[]> | undefined;
  public currentPath = '';
  error?: FirebaseError;
  company = appInformation;
  @Input() public selection = new SelectionModel<StorageItem>(true, []);
  public selectedFile: StorageFile | undefined;

  constructor(
    public storageService: FirebaseStorageService,
    private dialog: MatDialog,
    private cLog: ConsoleLoggerService
  ) {}

  ngOnInit() {
    this.items$ = this.getAllStorageItems(this.currentPath);
  }

  public toggleAllItems(checked: boolean, items: StorageItem[]) {
    if (!checked) {
      this.selection.clear();
      return;
    }
    this.selection.select(...items);
  }
  public allItemsSelected(items: StorageItem[]): boolean {
    return this.selection.selected.length === items.length && this.selection.selected.length > 0;
  }
  public allItemsIndeterminate(items: StorageItem[]): boolean {
    return this.selection.selected.length > 0 && this.selection.selected.length < items.length;
  }
  public storageItemSelected(item: StorageItem) {
    if (item.type === 'folder') this.setStoragePath(item.fullPath)
    else if (item.type === 'file') this.selectedFile = item;
  }
  public selectionIncludesFolder(): boolean {
    return this.selection.selected.some(item => item.type === 'folder');
  }

  public deleteItems(items: StorageItem[]) {
    const dialogRef = this.dialog.open(DeleteFilesDialogComponent, {
      minWidth: '250px'
    });
    dialogRef.afterClosed().forEach(result => {
        if (result) {
          this.storageService.deleteFiles(items)
            .then(() => {
              this.selection.clear();
              if (items.some(item => item == this.selectedFile)) this.selectedFile = undefined;
            })
            .then(() => this.reload(this.currentPath));
        }
      });
  }

  public getCrumbPath(pathArray: string[], index: number): string {
    pathArray.length = index + 1;
    return pathArray.join('/');
  }

  public setStoragePath(path: string) {
    this.items$ = this.getAllStorageItems(path);
    this.currentPath = path;
    if (this.selection.hasValue()) this.selection.clear();
  }

  async getAllStorageItems(path: string): Promise<StorageItem[]> {
    const storageRef: StorageReference = this.storageService.getRef(path);
    return this.storageService.listAll(storageRef)
      .then(async ({items, prefixes}) => {
        const allItems: StorageItem[] = [
          ...prefixes.map(this.storageService.importFolder),
          ...(await Promise.all(items.map(this.storageService.importFile)))
        ];
        return allItems;
      })
      .catch((error: FirebaseError) => {
        this.error = error;
        return new Promise(() => undefined);
      })
  }

  public reload(path: string | null = null) {
    let pathRef: StorageReference;
    if (path) pathRef = this.storageService.getRef(path);
    else pathRef = this.storageService.getRef(this.currentPath);

    this.items$ = this.storageService.listAll(pathRef)
      .then(async ({items, prefixes}) => [
        ...prefixes.map(this.storageService.importFolder),
        ...(await Promise.all(items.map(this.storageService.importFile)))
      ]);
  }

  public createNewFolder() {
    const dialogRef = this.dialog.open(NewFolderDialogComponent, {
      width: '250px',
      data: { folder: {path: this.currentPath} }
    });
    dialogRef.afterClosed().forEach(folderName => {
      if (folderName) {
        const path = `${this.currentPath ? this.currentPath+'/' : ''}${folderName}`;
        this.setStoragePath(path);
      }
    });
  }

  public async uploadItems(files?: FileList): Promise<void> {
    if (!files) return;

    // prevent file names to have ","(comma)
    if (Array.from(files).some(file => file.name.includes(","))) {
      this.cLog.warn(`File names cannot include a ","(comma)`);
      return;
    }

    const uploadedFiles: UploadResult[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileRef = await this.storageService.getRef(`${this.currentPath}/${file.name}`);
      await this.storageService.uploadFile(fileRef, file)
        .then((snapshot) => uploadedFiles.push(snapshot))
        .catch(error => this.cLog.error(`error uploading file: '${file}'`, error));
    }
    this.reload(this.currentPath);
    this.cLog.info(`uploaded ${uploadedFiles.length} ${uploadedFiles.length === 1 ? 'file' : 'files'}`, uploadedFiles);
  }

  public async onFilesSelect($event: Event): Promise<void> {
    const files: FileList = (<HTMLInputElement>$event.target).files as FileList;
    await this.uploadItems(files);
  }
}
