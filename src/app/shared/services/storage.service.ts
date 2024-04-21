import { Injectable } from '@angular/core';
import {
  Storage, StorageReference, uploadBytes,
  UploadResult, ref, getDownloadURL,
  UploadMetadata, ListResult, listAll,
  getMetadata, FullMetadata, deleteObject
} from '@angular/fire/storage';

type ItemPredicate = string | StorageReference;

@Injectable({ providedIn: 'root' })
export class StorageService {

  constructor(private storage: Storage) {}

  /**
   * Returns a {@link StorageReference} for the given url or given {@link StorageReference}.
   *
   * @param reference - {@link ItemPredicate} instance.
   *
   * @public
   */
  itemRef(reference: ItemPredicate): StorageReference {
    return typeof reference === 'string' ? ref(this.storage, reference) : reference;
  }

  /**
   * Returns the download URL for the given {@link ItemPredicate}.
   * @param ref - {@link StorageReference} to get the download URL for.
   * @returns A `Promise` that resolves with the download URL for this object.
   *
   * @public
   */
  async getURL(ref: ItemPredicate): Promise<string> {
    return await getDownloadURL(this.itemRef(ref));
  }

  /**
   * Uploads data to this object's location.
   *
   * @remarks
   * The upload is not resumable.
   *
   * @param ref - {@link ItemPredicate} where data should be uploaded.
   * @param data - {@link File} or {@link Blob} or {@link ArrayBuffer} or {@link Uint8Array} to upload.
   * @param metadata - Metadata for the data to upload.
   * @returns A Promise containing an UploadResult
   *
   * @public
   */
  async uploadBytes(
    ref: ItemPredicate,
    data: File | Blob | ArrayBuffer | Uint8Array,
    metadata?: UploadMetadata
  ): Promise<UploadResult> { return await uploadBytes(this.itemRef(ref), data, metadata); }

  /**
   * List all items (files) and prefixes (folders) under this storage reference.
   *
   * @remarks
   * This is a helper method for calling list() repeatedly until there are
   * no more results. The default pagination size is 1000.
   *
   * Note: The results may not be consistent if objects are changed while this
   * operation is running.
   *
   * Warning: `listAll` may potentially consume too many resources if there are
   * too many results.
   *
   * @param ref - {@link ItemPredicate} to get list from.
   * @returns A `Promise` that resolves with all the items and prefixes under
   *      the current storage reference. `prefixes` contains references to
   *      sub-directories and `items` contains references to objects in this
   *      folder. `nextPageToken` is never returned.
   *
   * @public
   */
  async listAll(ref: ItemPredicate): Promise<ListResult> {
    return await listAll(this.itemRef(ref));
  }

  /**
   * A `Promise` that resolves with the metadata for this object. If this
   * object doesn't exist or metadata cannot be retreived, the promise is
   * rejected.
   *
   * @param ref - {@link ItemPredicate} to get metadata from.
   *
   * @public
   */
  async getMetadata(ref: ItemPredicate): Promise<FullMetadata> {
    return await getMetadata(this.itemRef(ref));
  }

  /**
   * Deletes the object at this location.
   *
   * @param ref - {@link ItemPredicate} for object to delete.
   * @returns A `Promise` that resolves if the deletion succeeds.
   *
   * @public
   */
  async deleteFile(ref: ItemPredicate): Promise<void> {
    return await deleteObject(this.itemRef(ref));
  }

  /**
   * Deletes the folder and all children at this location.
   *
   * @param folderPath - The path of the folder to delete.
   * @returns A `Promise` that resolves if the deletion succeeds.
   *
   * @public
   */
  async deleteFolder(folderPath: string): Promise<void> {
    const { items, prefixes } = await this.listAll(this.itemRef(folderPath));

    try {
      /**
       * We don't know if physical folder exists, or it is inferred from
       * nested file path.
       *
       * So here we attempt to delete physical representation, but if it does
       * not exist, we just swallow the error.
       */
      await this.deleteFile(folderPath + `%2f`);
    } catch {
      // quietly swallow any errors.
    }

    /** delete folder sub folders */
    const prefixesPromise: Promise<void>[] = prefixes.map(async (prefix) => {
      return await this.deleteFolder(prefix.fullPath);
    });

    /** delete folder files */
    const filesPromise: Promise<void>[] = items.map(async (file) => {
      return await this.deleteFile(file.fullPath);
    });

    await Promise.all([...filesPromise, ...prefixesPromise]);
  }

}
