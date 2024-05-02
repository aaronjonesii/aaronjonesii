import { Inject, Injectable } from '@angular/core';
import {
  Storage, StorageReference,
  ListResult, listAll, ref,
  uploadBytes, UploadResult,
  FullMetadata, getDownloadURL,
  getMetadata, deleteObject,
} from '@angular/fire/storage';
import { StorageFile, StorageFolder, StorageItem } from '../interfaces';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class FirebaseStorageService {
  constructor(
    private storage: Storage,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  /**
   * Retrieves a StorageReference object for interacting with
   * Firebase Storage at the given path.
   *
   * @param {string} path - The desired path within Firebase Storage.
   * @return {StorageReference} A reference to the specified location.
   */
  getRef(path: string): StorageReference {
    return ref(this.storage, path);
  }

  /**
   * Lists all files and prefixes (subfolders) within a Firebase Storage
   * directory.
   *
   * @param {StorageReference} listRef - A reference to the directory to list.
   * @return {Promise<ListResult>} Resolves with the listing results.
   */
  async listAll(listRef: StorageReference): Promise<ListResult> {
    return await listAll(listRef);
  }

  /**
   * Uploads a file to Firebase Storage with metadata for correct download
   * behavior.
   *
   * @param {StorageReference} ref - Reference to the target upload location.
   * @param {File} file - The file object to upload.
   * @return {Promise<UploadResult>} Resolves with the upload results.
   */
  async uploadFile(ref: StorageReference, file: File): Promise<UploadResult> {
    /*
    * set content disposition to show filename instead of path on downloads
    * file name cannot contain a ","(comma), it will be included in the
    * content disposition */
    const metadata = {
      contentDisposition: `attachment; filename=${file.name}`,
    };
    return await uploadBytes(ref, file, metadata);
  }

  /**
   * Uploads multiple files in parallel, optionally placing them within a
   * folder.
   *
   * @param {File[]} files - An array of file objects to upload.
   * @param {string} [folder] - Optional folder name for the uploaded files.
   * @return {Promise<UploadResult[]>} Resolves with an array of upload results.
   */
  async uploadFiles(files: File[], folder?: string): Promise<UploadResult[]> {
    return Promise.all(files.map(async (file) => {
      const path = folder ? `${folder}/${file.name}` : file.name;
      const fileRef = this.getRef(path);
      return await this.uploadFile(fileRef, file);
    }));
  }

  /**
   * Fetches full metadata for a file in Firebase Storage and
   * constructs a StorageFile object.
   *
   * @param {StorageReference} fileRef - A reference to the file.
   * @return {Promise<StorageFile>} Resolves with the StorageFile
   * representation.
   */
  async importFile(fileRef: StorageReference): Promise<StorageFile> {
    const metadata: FullMetadata = await getMetadata(fileRef);
    return { type: 'file', ...metadata };
  }

  /**
   * Creates a StorageFolder object representing a Firebase Storage folder.
   *
   * @param {StorageReference} folder - A reference to the folder.
   * @return {StorageFolder}
   */
  importFolder(folder: StorageReference): StorageFolder {
    return {
      type: 'folder',
      name: folder.name,
      fullPath: folder.fullPath,
    };
  }

  /**
   * Retrieves a direct download URL for a file in Firebase Storage.
   *
   * @param {StorageReference} ref - A reference to the file.
   * @return {Promise<string>} Resolves with the download URL string.
   */
  async getDownloadURL(ref: StorageReference): Promise<string> {
    return getDownloadURL(ref);
  }

  /**
   * Opens all provided files in new browser tabs by generating download URLs
   * and triggering download links.
   *
   * @param {StorageItem[]} files - An array of StorageItem objects
   * representing files.
   */
  async openAllFiles(files: StorageItem[]) {
    const paths = files.map((file) => file.fullPath);
    const links = await Promise.all(paths.map((path) => this.getRef(path))
      .map((ref) => this.getDownloadURL(ref)));
    links.forEach((url) => {
      const anchor = this.createAnchorElement(url);
      anchor.click();
    });
  }

  /**
   * Recursively deletes a folder and its contents from Firebase Storage.
   * Handles potential errors if the physical folder doesn't exist.
   *
   * @param {string} path - The full path of the folder to delete.
   */
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

  /**
   * Deletes a file from Firebase Storage.
   *
   * @param {string} path - The full path to the file.
   */
  async deleteFile(path: string): Promise<void> {
    return deleteObject(this.getRef(path));
  }

  /**
   * Deletes multiple files or folders from Firebase Storage.
   *
   * @param {StorageItem[]} items - An array of StorageItem objects.
   */
  async deleteFiles(items: StorageItem[]) {
    return await Promise.all(
      items.map(async (item) => {
        if (item?.type === 'folder') {
          return await this.deleteFolder(item.fullPath);
        } else if (item?.type === 'file') {
          return await this.deleteFile(item.fullPath);
        }
      })
    );
  }

  /**
   * Helper function to create a download link element.
   *
   * @param {string} url - The download URL for the file.
   * @return {HTMLAnchorElement} A configured anchor element for triggering
   * a download.
   */
  createAnchorElement(url: string): HTMLAnchorElement {
    const a: HTMLAnchorElement = this.document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener';
    return a;
  }
}
