import { Inject, Injectable } from '@angular/core';
import { listAll, ref, uploadBytes, getDownloadURL, getMetadata, deleteObject, } from '@angular/fire/storage';
import { DOCUMENT } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/fire/storage";
export class FirebaseStorageService {
    constructor(storage, document) {
        this.storage = storage;
        this.document = document;
    }
    /**
     * Retrieves a StorageReference object for interacting with
     * Firebase Storage at the given path.
     *
     * @param {string} path - The desired path within Firebase Storage.
     * @return {StorageReference} A reference to the specified location.
     */
    getRef(path) {
        return ref(this.storage, path);
    }
    /**
     * Lists all files and prefixes (subfolders) within a Firebase Storage
     * directory.
     *
     * @param {StorageReference} listRef - A reference to the directory to list.
     * @return {Promise<ListResult>} Resolves with the listing results.
     */
    async listAll(listRef) {
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
    async uploadFile(ref, file) {
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
    async uploadFiles(files, folder) {
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
    async importFile(fileRef) {
        const metadata = await getMetadata(fileRef);
        return { type: 'file', ...metadata };
    }
    /**
     * Creates a StorageFolder object representing a Firebase Storage folder.
     *
     * @param {StorageReference} folder - A reference to the folder.
     * @return {StorageFolder}
     */
    importFolder(folder) {
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
    async getDownloadURL(ref) {
        return getDownloadURL(ref);
    }
    /**
     * Opens all provided files in new browser tabs by generating download URLs
     * and triggering download links.
     *
     * @param {StorageItem[]} files - An array of StorageItem objects
     * representing files.
     */
    async openAllFiles(files) {
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
    async deleteFolder(path) {
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
        }
        catch {
            // quietly swallow any errors.
        }
        const prefixesPromise = prefixes.map(async (prefix) => {
            return await this.deleteFolder(prefix.fullPath);
        });
        const filesPromise = items.map(async (file) => {
            return await this.deleteFile(file.fullPath);
        });
        await Promise.all([...filesPromise, ...prefixesPromise]);
    }
    /**
     * Deletes a file from Firebase Storage.
     *
     * @param {string} path - The full path to the file.
     */
    async deleteFile(path) {
        return deleteObject(this.getRef(path));
    }
    /**
     * Deletes multiple files or folders from Firebase Storage.
     *
     * @param {StorageItem[]} items - An array of StorageItem objects.
     */
    async deleteFiles(items) {
        return await Promise.all(items.map(async (item) => {
            if (item?.type === 'folder') {
                return await this.deleteFolder(item.fullPath);
            }
            else if (item?.type === 'file') {
                return await this.deleteFile(item.fullPath);
            }
        }));
    }
    /**
     * Helper function to create a download link element.
     *
     * @param {string} url - The download URL for the file.
     * @return {HTMLAnchorElement} A configured anchor element for triggering
     * a download.
     */
    createAnchorElement(url) {
        const a = this.document.createElement('a');
        a.href = url;
        a.target = '_blank';
        a.rel = 'noopener';
        return a;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.3", ngImport: i0, type: FirebaseStorageService, deps: [{ token: i1.Storage }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.3", ngImport: i0, type: FirebaseStorageService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.3", ngImport: i0, type: FirebaseStorageService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [{ type: i1.Storage }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2Utc3RvcmFnZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1maXJlYmFzZS1zdG9yYWdlLW1hbmFnZXIvc3JjL2xpYi9zZXJ2aWNlcy9maXJlYmFzZS1zdG9yYWdlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUVPLE9BQU8sRUFBRSxHQUFHLEVBQ3hCLFdBQVcsRUFDRyxjQUFjLEVBQzVCLFdBQVcsRUFBRSxZQUFZLEdBQzFCLE1BQU0sdUJBQXVCLENBQUM7QUFFL0IsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7QUFHM0MsTUFBTSxPQUFPLHNCQUFzQjtJQUNqQyxZQUNVLE9BQWdCLEVBQ0UsUUFBa0I7UUFEcEMsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUNFLGFBQVEsR0FBUixRQUFRLENBQVU7SUFDM0MsQ0FBQztJQUVKOzs7Ozs7T0FNRztJQUNILE1BQU0sQ0FBQyxJQUFZO1FBQ2pCLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBeUI7UUFDckMsT0FBTyxNQUFNLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBcUIsRUFBRSxJQUFVO1FBQ2hEOzs7Z0NBR3dCO1FBQ3hCLE1BQU0sUUFBUSxHQUFHO1lBQ2Ysa0JBQWtCLEVBQUUsd0JBQXdCLElBQUksQ0FBQyxJQUFJLEVBQUU7U0FDeEQsQ0FBQztRQUNGLE9BQU8sTUFBTSxXQUFXLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBYSxFQUFFLE1BQWU7UUFDOUMsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFO1lBQzFDLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzNELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEMsT0FBTyxNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzlDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBeUI7UUFDeEMsTUFBTSxRQUFRLEdBQWlCLE1BQU0sV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUcsUUFBUSxFQUFFLENBQUM7SUFDdkMsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsWUFBWSxDQUFDLE1BQXdCO1FBQ25DLE9BQU87WUFDTCxJQUFJLEVBQUUsUUFBUTtZQUNkLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSTtZQUNqQixRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVE7U0FDMUIsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILEtBQUssQ0FBQyxjQUFjLENBQUMsR0FBcUI7UUFDeEMsT0FBTyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBb0I7UUFDckMsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pELE1BQU0sS0FBSyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ25FLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0MsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ3BCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM3QyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxLQUFLLENBQUMsWUFBWSxDQUFDLElBQVk7UUFDN0IsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRWxFLElBQUksQ0FBQztZQUNIOzs7Ozs7ZUFNRztZQUNILE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDdEMsQ0FBQztRQUFDLE1BQU0sQ0FBQztZQUNQLDhCQUE4QjtRQUNoQyxDQUFDO1FBRUQsTUFBTSxlQUFlLEdBQW9CLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3JFLE9BQU8sTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsRCxDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sWUFBWSxHQUFvQixLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRTtZQUM3RCxPQUFPLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLFlBQVksRUFBRSxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsVUFBVSxDQUFDLElBQVk7UUFDM0IsT0FBTyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFvQjtRQUNwQyxPQUFPLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FDdEIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUU7WUFDdkIsSUFBSSxJQUFJLEVBQUUsSUFBSSxLQUFLLFFBQVEsRUFBRSxDQUFDO2dCQUM1QixPQUFPLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDaEQsQ0FBQztpQkFBTSxJQUFJLElBQUksRUFBRSxJQUFJLEtBQUssTUFBTSxFQUFFLENBQUM7Z0JBQ2pDLE9BQU8sTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM5QyxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxtQkFBbUIsQ0FBQyxHQUFXO1FBQzdCLE1BQU0sQ0FBQyxHQUFzQixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5RCxDQUFDLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztRQUNiLENBQUMsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxHQUFHLEdBQUcsVUFBVSxDQUFDO1FBQ25CLE9BQU8sQ0FBQyxDQUFDO0lBQ1gsQ0FBQzs4R0E3TFUsc0JBQXNCLHlDQUd2QixRQUFRO2tIQUhQLHNCQUFzQixjQURULE1BQU07OzJGQUNuQixzQkFBc0I7a0JBRGxDLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFOzswQkFJN0IsTUFBTTsyQkFBQyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBTdG9yYWdlLCBTdG9yYWdlUmVmZXJlbmNlLFxuICBMaXN0UmVzdWx0LCBsaXN0QWxsLCByZWYsXG4gIHVwbG9hZEJ5dGVzLCBVcGxvYWRSZXN1bHQsXG4gIEZ1bGxNZXRhZGF0YSwgZ2V0RG93bmxvYWRVUkwsXG4gIGdldE1ldGFkYXRhLCBkZWxldGVPYmplY3QsXG59IGZyb20gJ0Bhbmd1bGFyL2ZpcmUvc3RvcmFnZSc7XG5pbXBvcnQgeyBTdG9yYWdlRmlsZSwgU3RvcmFnZUZvbGRlciwgU3RvcmFnZUl0ZW0gfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBGaXJlYmFzZVN0b3JhZ2VTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBzdG9yYWdlOiBTdG9yYWdlLFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50LFxuICApIHt9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyBhIFN0b3JhZ2VSZWZlcmVuY2Ugb2JqZWN0IGZvciBpbnRlcmFjdGluZyB3aXRoXG4gICAqIEZpcmViYXNlIFN0b3JhZ2UgYXQgdGhlIGdpdmVuIHBhdGguXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIC0gVGhlIGRlc2lyZWQgcGF0aCB3aXRoaW4gRmlyZWJhc2UgU3RvcmFnZS5cbiAgICogQHJldHVybiB7U3RvcmFnZVJlZmVyZW5jZX0gQSByZWZlcmVuY2UgdG8gdGhlIHNwZWNpZmllZCBsb2NhdGlvbi5cbiAgICovXG4gIGdldFJlZihwYXRoOiBzdHJpbmcpOiBTdG9yYWdlUmVmZXJlbmNlIHtcbiAgICByZXR1cm4gcmVmKHRoaXMuc3RvcmFnZSwgcGF0aCk7XG4gIH1cblxuICAvKipcbiAgICogTGlzdHMgYWxsIGZpbGVzIGFuZCBwcmVmaXhlcyAoc3ViZm9sZGVycykgd2l0aGluIGEgRmlyZWJhc2UgU3RvcmFnZVxuICAgKiBkaXJlY3RvcnkuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RvcmFnZVJlZmVyZW5jZX0gbGlzdFJlZiAtIEEgcmVmZXJlbmNlIHRvIHRoZSBkaXJlY3RvcnkgdG8gbGlzdC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxMaXN0UmVzdWx0Pn0gUmVzb2x2ZXMgd2l0aCB0aGUgbGlzdGluZyByZXN1bHRzLlxuICAgKi9cbiAgYXN5bmMgbGlzdEFsbChsaXN0UmVmOiBTdG9yYWdlUmVmZXJlbmNlKTogUHJvbWlzZTxMaXN0UmVzdWx0PiB7XG4gICAgcmV0dXJuIGF3YWl0IGxpc3RBbGwobGlzdFJlZik7XG4gIH1cblxuICAvKipcbiAgICogVXBsb2FkcyBhIGZpbGUgdG8gRmlyZWJhc2UgU3RvcmFnZSB3aXRoIG1ldGFkYXRhIGZvciBjb3JyZWN0IGRvd25sb2FkXG4gICAqIGJlaGF2aW9yLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0b3JhZ2VSZWZlcmVuY2V9IHJlZiAtIFJlZmVyZW5jZSB0byB0aGUgdGFyZ2V0IHVwbG9hZCBsb2NhdGlvbi5cbiAgICogQHBhcmFtIHtGaWxlfSBmaWxlIC0gVGhlIGZpbGUgb2JqZWN0IHRvIHVwbG9hZC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxVcGxvYWRSZXN1bHQ+fSBSZXNvbHZlcyB3aXRoIHRoZSB1cGxvYWQgcmVzdWx0cy5cbiAgICovXG4gIGFzeW5jIHVwbG9hZEZpbGUocmVmOiBTdG9yYWdlUmVmZXJlbmNlLCBmaWxlOiBGaWxlKTogUHJvbWlzZTxVcGxvYWRSZXN1bHQ+IHtcbiAgICAvKlxuICAgICogc2V0IGNvbnRlbnQgZGlzcG9zaXRpb24gdG8gc2hvdyBmaWxlbmFtZSBpbnN0ZWFkIG9mIHBhdGggb24gZG93bmxvYWRzXG4gICAgKiBmaWxlIG5hbWUgY2Fubm90IGNvbnRhaW4gYSBcIixcIihjb21tYSksIGl0IHdpbGwgYmUgaW5jbHVkZWQgaW4gdGhlXG4gICAgKiBjb250ZW50IGRpc3Bvc2l0aW9uICovXG4gICAgY29uc3QgbWV0YWRhdGEgPSB7XG4gICAgICBjb250ZW50RGlzcG9zaXRpb246IGBhdHRhY2htZW50OyBmaWxlbmFtZT0ke2ZpbGUubmFtZX1gLFxuICAgIH07XG4gICAgcmV0dXJuIGF3YWl0IHVwbG9hZEJ5dGVzKHJlZiwgZmlsZSwgbWV0YWRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwbG9hZHMgbXVsdGlwbGUgZmlsZXMgaW4gcGFyYWxsZWwsIG9wdGlvbmFsbHkgcGxhY2luZyB0aGVtIHdpdGhpbiBhXG4gICAqIGZvbGRlci5cbiAgICpcbiAgICogQHBhcmFtIHtGaWxlW119IGZpbGVzIC0gQW4gYXJyYXkgb2YgZmlsZSBvYmplY3RzIHRvIHVwbG9hZC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtmb2xkZXJdIC0gT3B0aW9uYWwgZm9sZGVyIG5hbWUgZm9yIHRoZSB1cGxvYWRlZCBmaWxlcy5cbiAgICogQHJldHVybiB7UHJvbWlzZTxVcGxvYWRSZXN1bHRbXT59IFJlc29sdmVzIHdpdGggYW4gYXJyYXkgb2YgdXBsb2FkIHJlc3VsdHMuXG4gICAqL1xuICBhc3luYyB1cGxvYWRGaWxlcyhmaWxlczogRmlsZVtdLCBmb2xkZXI/OiBzdHJpbmcpOiBQcm9taXNlPFVwbG9hZFJlc3VsdFtdPiB7XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKGZpbGVzLm1hcChhc3luYyAoZmlsZSkgPT4ge1xuICAgICAgY29uc3QgcGF0aCA9IGZvbGRlciA/IGAke2ZvbGRlcn0vJHtmaWxlLm5hbWV9YCA6IGZpbGUubmFtZTtcbiAgICAgIGNvbnN0IGZpbGVSZWYgPSB0aGlzLmdldFJlZihwYXRoKTtcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLnVwbG9hZEZpbGUoZmlsZVJlZiwgZmlsZSk7XG4gICAgfSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZldGNoZXMgZnVsbCBtZXRhZGF0YSBmb3IgYSBmaWxlIGluIEZpcmViYXNlIFN0b3JhZ2UgYW5kXG4gICAqIGNvbnN0cnVjdHMgYSBTdG9yYWdlRmlsZSBvYmplY3QuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RvcmFnZVJlZmVyZW5jZX0gZmlsZVJlZiAtIEEgcmVmZXJlbmNlIHRvIHRoZSBmaWxlLlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPFN0b3JhZ2VGaWxlPn0gUmVzb2x2ZXMgd2l0aCB0aGUgU3RvcmFnZUZpbGVcbiAgICogcmVwcmVzZW50YXRpb24uXG4gICAqL1xuICBhc3luYyBpbXBvcnRGaWxlKGZpbGVSZWY6IFN0b3JhZ2VSZWZlcmVuY2UpOiBQcm9taXNlPFN0b3JhZ2VGaWxlPiB7XG4gICAgY29uc3QgbWV0YWRhdGE6IEZ1bGxNZXRhZGF0YSA9IGF3YWl0IGdldE1ldGFkYXRhKGZpbGVSZWYpO1xuICAgIHJldHVybiB7IHR5cGU6ICdmaWxlJywgLi4ubWV0YWRhdGEgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgU3RvcmFnZUZvbGRlciBvYmplY3QgcmVwcmVzZW50aW5nIGEgRmlyZWJhc2UgU3RvcmFnZSBmb2xkZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RvcmFnZVJlZmVyZW5jZX0gZm9sZGVyIC0gQSByZWZlcmVuY2UgdG8gdGhlIGZvbGRlci5cbiAgICogQHJldHVybiB7U3RvcmFnZUZvbGRlcn1cbiAgICovXG4gIGltcG9ydEZvbGRlcihmb2xkZXI6IFN0b3JhZ2VSZWZlcmVuY2UpOiBTdG9yYWdlRm9sZGVyIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogJ2ZvbGRlcicsXG4gICAgICBuYW1lOiBmb2xkZXIubmFtZSxcbiAgICAgIGZ1bGxQYXRoOiBmb2xkZXIuZnVsbFBhdGgsXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgYSBkaXJlY3QgZG93bmxvYWQgVVJMIGZvciBhIGZpbGUgaW4gRmlyZWJhc2UgU3RvcmFnZS5cbiAgICpcbiAgICogQHBhcmFtIHtTdG9yYWdlUmVmZXJlbmNlfSByZWYgLSBBIHJlZmVyZW5jZSB0byB0aGUgZmlsZS5cbiAgICogQHJldHVybiB7UHJvbWlzZTxzdHJpbmc+fSBSZXNvbHZlcyB3aXRoIHRoZSBkb3dubG9hZCBVUkwgc3RyaW5nLlxuICAgKi9cbiAgYXN5bmMgZ2V0RG93bmxvYWRVUkwocmVmOiBTdG9yYWdlUmVmZXJlbmNlKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gZ2V0RG93bmxvYWRVUkwocmVmKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVucyBhbGwgcHJvdmlkZWQgZmlsZXMgaW4gbmV3IGJyb3dzZXIgdGFicyBieSBnZW5lcmF0aW5nIGRvd25sb2FkIFVSTHNcbiAgICogYW5kIHRyaWdnZXJpbmcgZG93bmxvYWQgbGlua3MuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RvcmFnZUl0ZW1bXX0gZmlsZXMgLSBBbiBhcnJheSBvZiBTdG9yYWdlSXRlbSBvYmplY3RzXG4gICAqIHJlcHJlc2VudGluZyBmaWxlcy5cbiAgICovXG4gIGFzeW5jIG9wZW5BbGxGaWxlcyhmaWxlczogU3RvcmFnZUl0ZW1bXSkge1xuICAgIGNvbnN0IHBhdGhzID0gZmlsZXMubWFwKChmaWxlKSA9PiBmaWxlLmZ1bGxQYXRoKTtcbiAgICBjb25zdCBsaW5rcyA9IGF3YWl0IFByb21pc2UuYWxsKHBhdGhzLm1hcCgocGF0aCkgPT4gdGhpcy5nZXRSZWYocGF0aCkpXG4gICAgICAubWFwKChyZWYpID0+IHRoaXMuZ2V0RG93bmxvYWRVUkwocmVmKSkpO1xuICAgIGxpbmtzLmZvckVhY2goKHVybCkgPT4ge1xuICAgICAgY29uc3QgYW5jaG9yID0gdGhpcy5jcmVhdGVBbmNob3JFbGVtZW50KHVybCk7XG4gICAgICBhbmNob3IuY2xpY2soKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWN1cnNpdmVseSBkZWxldGVzIGEgZm9sZGVyIGFuZCBpdHMgY29udGVudHMgZnJvbSBGaXJlYmFzZSBTdG9yYWdlLlxuICAgKiBIYW5kbGVzIHBvdGVudGlhbCBlcnJvcnMgaWYgdGhlIHBoeXNpY2FsIGZvbGRlciBkb2Vzbid0IGV4aXN0LlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aCAtIFRoZSBmdWxsIHBhdGggb2YgdGhlIGZvbGRlciB0byBkZWxldGUuXG4gICAqL1xuICBhc3luYyBkZWxldGVGb2xkZXIocGF0aDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgeyBpdGVtcywgcHJlZml4ZXMgfSA9IGF3YWl0IHRoaXMubGlzdEFsbCh0aGlzLmdldFJlZihwYXRoKSk7XG5cbiAgICB0cnkge1xuICAgICAgLyoqXG4gICAgICAgKiBXZSBkb24ndCBrbm93IGlmIHBoeXNpY2FsIGZvbGRlciBleGlzdHMsIG9yIGl0IGlzIGluZmVycmVkIGZyb21cbiAgICAgICAqIG5lc3RlZCBmaWxlIHBhdGguXG4gICAgICAgKlxuICAgICAgICogU28gaGVyZSB3ZSBhdHRlbXB0IHRvIGRlbGV0ZSBwaHlzaWNhbCByZXByZXNlbnRhdGlvbiwgYnV0IGlmIGl0IGRvZXNcbiAgICAgICAqIG5vdCBleGlzdCwgd2UganVzdCBzd2FsbG93IHRoZSBlcnJvci5cbiAgICAgICAqL1xuICAgICAgYXdhaXQgdGhpcy5kZWxldGVGaWxlKHBhdGggKyBgJTJmYCk7XG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBxdWlldGx5IHN3YWxsb3cgYW55IGVycm9ycy5cbiAgICB9XG5cbiAgICBjb25zdCBwcmVmaXhlc1Byb21pc2U6IFByb21pc2U8dm9pZD5bXSA9IHByZWZpeGVzLm1hcChhc3luYyAocHJlZml4KSA9PiB7XG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy5kZWxldGVGb2xkZXIocHJlZml4LmZ1bGxQYXRoKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGZpbGVzUHJvbWlzZTogUHJvbWlzZTx2b2lkPltdID0gaXRlbXMubWFwKGFzeW5jIChmaWxlKSA9PiB7XG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy5kZWxldGVGaWxlKGZpbGUuZnVsbFBhdGgpO1xuICAgIH0pO1xuXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoWy4uLmZpbGVzUHJvbWlzZSwgLi4ucHJlZml4ZXNQcm9taXNlXSk7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlcyBhIGZpbGUgZnJvbSBGaXJlYmFzZSBTdG9yYWdlLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aCAtIFRoZSBmdWxsIHBhdGggdG8gdGhlIGZpbGUuXG4gICAqL1xuICBhc3luYyBkZWxldGVGaWxlKHBhdGg6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBkZWxldGVPYmplY3QodGhpcy5nZXRSZWYocGF0aCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZXMgbXVsdGlwbGUgZmlsZXMgb3IgZm9sZGVycyBmcm9tIEZpcmViYXNlIFN0b3JhZ2UuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RvcmFnZUl0ZW1bXX0gaXRlbXMgLSBBbiBhcnJheSBvZiBTdG9yYWdlSXRlbSBvYmplY3RzLlxuICAgKi9cbiAgYXN5bmMgZGVsZXRlRmlsZXMoaXRlbXM6IFN0b3JhZ2VJdGVtW10pIHtcbiAgICByZXR1cm4gYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICBpdGVtcy5tYXAoYXN5bmMgKGl0ZW0pID0+IHtcbiAgICAgICAgaWYgKGl0ZW0/LnR5cGUgPT09ICdmb2xkZXInKSB7XG4gICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuZGVsZXRlRm9sZGVyKGl0ZW0uZnVsbFBhdGgpO1xuICAgICAgICB9IGVsc2UgaWYgKGl0ZW0/LnR5cGUgPT09ICdmaWxlJykge1xuICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmRlbGV0ZUZpbGUoaXRlbS5mdWxsUGF0aCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIZWxwZXIgZnVuY3Rpb24gdG8gY3JlYXRlIGEgZG93bmxvYWQgbGluayBlbGVtZW50LlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIC0gVGhlIGRvd25sb2FkIFVSTCBmb3IgdGhlIGZpbGUuXG4gICAqIEByZXR1cm4ge0hUTUxBbmNob3JFbGVtZW50fSBBIGNvbmZpZ3VyZWQgYW5jaG9yIGVsZW1lbnQgZm9yIHRyaWdnZXJpbmdcbiAgICogYSBkb3dubG9hZC5cbiAgICovXG4gIGNyZWF0ZUFuY2hvckVsZW1lbnQodXJsOiBzdHJpbmcpOiBIVE1MQW5jaG9yRWxlbWVudCB7XG4gICAgY29uc3QgYTogSFRNTEFuY2hvckVsZW1lbnQgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBhLmhyZWYgPSB1cmw7XG4gICAgYS50YXJnZXQgPSAnX2JsYW5rJztcbiAgICBhLnJlbCA9ICdub29wZW5lcic7XG4gICAgcmV0dXJuIGE7XG4gIH1cbn1cbiJdfQ==