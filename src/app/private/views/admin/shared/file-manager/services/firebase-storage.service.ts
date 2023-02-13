import { Inject, Injectable } from '@angular/core';
import {
  Storage, StorageReference,
  ListResult, listAll, ref,
  uploadBytes, UploadResult,
  FullMetadata, getDownloadURL,
  getMetadata, deleteObject
} from '@angular/fire/storage';
import { StorageFile } from '../interfaces/storage-file';
import { StorageFolder } from '../interfaces/storage-folder';
import { StorageItem } from '../interfaces/storage-item';
import { DOCUMENT } from "@angular/common";

@Injectable({providedIn: 'root'})
export class FirebaseStorageService {

  constructor(
    private storage: Storage,
    @Inject(DOCUMENT) private document: Document
  ) {}

  /**
  * Get storage reference
  */
  getRef(path: string): StorageReference {
    return ref(this.storage, path);
  }

  /**
  * List all files in provided directory
  */
  async listAll(listRef: StorageReference): Promise<ListResult> {
    return await listAll(listRef);
  }

  /**
  * Upload file to storage
  */
  async uploadFile(ref: StorageReference, file: File): Promise<UploadResult> {
    /*
    * set content disposition to show filename instead of path on downloads
    * file name cannot contain a ","(comma), it will be included in the content disposition*/
    const metadata = { contentDisposition : `attachment; filename=${file.name}` };
    return await uploadBytes(ref, file, metadata);
  }
  async uploadFiles(files: File[], folder?: string): Promise<UploadResult[]> {
    return Promise.all(files.map(async file => {
      const path = folder ? `${folder}/${file.name}` : file.name;
      const fileRef = this.getRef(path);
      const metadata = { contentDisposition : "attachment; filename=" + file.name };
      return await uploadBytes(fileRef, file, metadata);
    }));
  }

  /**
   * Get Metadata of StorageReference
   */
  async getMetadata(ref: StorageReference) {
    return await getMetadata(ref);
  }

  async importFile(fileRef: StorageReference): Promise<StorageFile> {
    const metadata: FullMetadata = await getMetadata(fileRef);
    return { type: 'file', ...metadata };
  }
  importFolder(folder: StorageReference): StorageFolder {
    return {
      type: 'folder',
      name: folder.name,
      fullPath: folder.fullPath
    };
  }

  async getDownloadURL(ref:StorageReference) {
    return await getDownloadURL(ref);
  }

  public async openAllFiles(files: StorageItem[]) {
    const paths = files.map(file => file.fullPath);
    const links = await Promise.all(paths.map(path => this.getRef(path)).map(ref => this.getDownloadURL(ref)));
    links.forEach(url => {
      const a: HTMLAnchorElement = this.document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener';
      a.click();
    });
  }

  async deleteFolder(path: string): Promise<void> {
    const { items, prefixes } = await this.listAll(this.getRef(path));

    try {
      /**
       * We don't know if physical folder exists, or it is inferred from
       * nested file path.
       *
       * So here we attempt to delete physical representation, but if it does
       * not exist, we just swallow the error.
       */
      await this.deleteFile(path + `%2f`);
    } catch {
      // quietly swallow any errors.
    }

    const prefixesPromise: Promise<void>[] = prefixes.map(async (prefix) => {
      return await this.deleteFolder(prefix.fullPath);
    });

    const filesPromise: Promise<void>[] = items.map(async (file) => {
      return await this.deleteFile(file.fullPath);
    });

    await Promise.all([...filesPromise, ...prefixesPromise]);
  }

  public async deleteFile(path: string): Promise<void> {
    return await deleteObject(this.getRef(path));
  }

  async deleteFiles(selection: StorageItem[]) {
    const paths = selection.map(item => item.fullPath);
    return await Promise.all(
      paths.map(async (path: string) => {
        const item = selection.find((item) => item.fullPath === path)!;

        if (item.type === 'folder') return await this.deleteFolder(item.fullPath)
        else if (item.type === 'file') return await this.deleteFile(item.fullPath)
      })
    );
  }
}
