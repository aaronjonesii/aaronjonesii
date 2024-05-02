import { Inject, Injectable } from '@angular/core';
import { listAll, ref, uploadBytes, getDownloadURL, getMetadata, deleteObject, } from '@angular/fire/storage';
import { DOCUMENT } from "@angular/common";
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
     * @returns {StorageReference} A reference to the specified location.
     */
    getRef(path) {
        return ref(this.storage, path);
    }
    /**
     * Lists all files and prefixes (subfolders) within a Firebase Storage directory.
     *
     * @param {StorageReference} listRef - A reference to the directory to list.
     * @returns {Promise<ListResult>} Resolves with the listing results.
     */
    async listAll(listRef) {
        return await listAll(listRef);
    }
    /**
     * Uploads a file to Firebase Storage with metadata for correct download behavior.
     *
     * @param {StorageReference} ref - Reference to the target upload location.
     * @param {File} file - The file object to upload.
     * @returns {Promise<UploadResult>} Resolves with the upload results.
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
     * Uploads multiple files in parallel, optionally placing them within a folder.
     *
     * @param {File[]} files - An array of file objects to upload.
     * @param {string} [folder] - Optional folder name for the uploaded files.
     * @returns {Promise<UploadResult[]>} Resolves with an array of upload results.
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
     * @returns {Promise<StorageFile>} Resolves with the StorageFile representation.
     */
    async importFile(fileRef) {
        const metadata = await getMetadata(fileRef);
        return { type: 'file', ...metadata };
    }
    /**
     * Creates a StorageFolder object representing a Firebase Storage folder.
     *
     * @param {StorageReference} folder - A reference to the folder.
     * @returns {StorageFolder}
     */
    importFolder(folder) {
        return {
            type: 'folder',
            name: folder.name,
            fullPath: folder.fullPath
        };
    }
    /**
     * Retrieves a direct download URL for a file in Firebase Storage.
     *
     * @param {StorageReference} ref - A reference to the file.
     * @returns {Promise<string>} Resolves with the download URL string.
     */
    async getDownloadURL(ref) {
        return getDownloadURL(ref);
    }
    /**
     * Opens all provided files in new browser tabs by generating download URLs
     * and triggering download links.
     *
     * @param {StorageItem[]} files - An array of StorageItem objects representing files.
     */
    async openAllFiles(files) {
        const paths = files.map(file => file.fullPath);
        const links = await Promise.all(paths.map(path => this.getRef(path))
            .map(ref => this.getDownloadURL(ref)));
        links.forEach(url => {
            const anchor = this.createAnchorElement(url);
            anchor.click();
        });
    }
    /**
     * Recursively deletes a folder and its contents from Firebase Storage. Handles
     * potential errors if the physical folder doesn't exist.
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
            if (item?.type === 'folder')
                return await this.deleteFolder(item.fullPath);
            else if (item?.type === 'file')
                return await this.deleteFile(item.fullPath);
        }));
    }
    /**
     * Helper function to create a download link element.
     *
     * @param {string} url - The download URL for the file.
     * @returns {HTMLAnchorElement} A configured anchor element for triggering a download.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2Utc3RvcmFnZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1maXJlYmFzZS1zdG9yYWdlLW1hbmFnZXIvc3JjL2xpYi9zZXJ2aWNlcy9maXJlYmFzZS1zdG9yYWdlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUVPLE9BQU8sRUFBRSxHQUFHLEVBQ3hCLFdBQVcsRUFDRyxjQUFjLEVBQzVCLFdBQVcsRUFBRSxZQUFZLEdBQzFCLE1BQU0sdUJBQXVCLENBQUM7QUFFL0IsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7QUFHM0MsTUFBTSxPQUFPLHNCQUFzQjtJQUVqQyxZQUNVLE9BQWdCLEVBQ0UsUUFBa0I7UUFEcEMsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUNFLGFBQVEsR0FBUixRQUFRLENBQVU7SUFDM0MsQ0FBQztJQUVKOzs7Ozs7T0FNRztJQUNILE1BQU0sQ0FBQyxJQUFZO1FBQ2pCLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUF5QjtRQUNyQyxPQUFPLE1BQU0sT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxLQUFLLENBQUMsVUFBVSxDQUFDLEdBQXFCLEVBQUUsSUFBVTtRQUNoRDs7O2dDQUd3QjtRQUN4QixNQUFNLFFBQVEsR0FBRztZQUNmLGtCQUFrQixFQUFHLHdCQUF3QixJQUFJLENBQUMsSUFBSSxFQUFFO1NBQ3pELENBQUM7UUFDRixPQUFPLE1BQU0sV0FBVyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUs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OEdBckxVLHNCQUFzQix5Q0FJdkIsUUFBUTtrSEFKUCxzQkFBc0IsY0FEVCxNQUFNOzsyRkFDbkIsc0JBQXNCO2tCQURsQyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTs7MEJBSzdCLE1BQU07MkJBQUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgU3RvcmFnZSwgU3RvcmFnZVJlZmVyZW5jZSxcbiAgTGlzdFJlc3VsdCwgbGlzdEFsbCwgcmVmLFxuICB1cGxvYWRCeXRlcywgVXBsb2FkUmVzdWx0LFxuICBGdWxsTWV0YWRhdGEsIGdldERvd25sb2FkVVJMLFxuICBnZXRNZXRhZGF0YSwgZGVsZXRlT2JqZWN0LFxufSBmcm9tICdAYW5ndWxhci9maXJlL3N0b3JhZ2UnO1xuaW1wb3J0IHsgU3RvcmFnZUZpbGUsIFN0b3JhZ2VGb2xkZXIsIFN0b3JhZ2VJdGVtIH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBGaXJlYmFzZVN0b3JhZ2VTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHN0b3JhZ2U6IFN0b3JhZ2UsXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnQsXG4gICkge31cblxuICAvKipcbiAgICogUmV0cmlldmVzIGEgU3RvcmFnZVJlZmVyZW5jZSBvYmplY3QgZm9yIGludGVyYWN0aW5nIHdpdGhcbiAgICogRmlyZWJhc2UgU3RvcmFnZSBhdCB0aGUgZ2l2ZW4gcGF0aC5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGggLSBUaGUgZGVzaXJlZCBwYXRoIHdpdGhpbiBGaXJlYmFzZSBTdG9yYWdlLlxuICAgKiBAcmV0dXJucyB7U3RvcmFnZVJlZmVyZW5jZX0gQSByZWZlcmVuY2UgdG8gdGhlIHNwZWNpZmllZCBsb2NhdGlvbi5cbiAgICovXG4gIGdldFJlZihwYXRoOiBzdHJpbmcpOiBTdG9yYWdlUmVmZXJlbmNlIHtcbiAgICByZXR1cm4gcmVmKHRoaXMuc3RvcmFnZSwgcGF0aCk7XG4gIH1cblxuICAvKipcbiAgICogTGlzdHMgYWxsIGZpbGVzIGFuZCBwcmVmaXhlcyAoc3ViZm9sZGVycykgd2l0aGluIGEgRmlyZWJhc2UgU3RvcmFnZSBkaXJlY3RvcnkuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RvcmFnZVJlZmVyZW5jZX0gbGlzdFJlZiAtIEEgcmVmZXJlbmNlIHRvIHRoZSBkaXJlY3RvcnkgdG8gbGlzdC5cbiAgICogQHJldHVybnMge1Byb21pc2U8TGlzdFJlc3VsdD59IFJlc29sdmVzIHdpdGggdGhlIGxpc3RpbmcgcmVzdWx0cy5cbiAgICovXG4gIGFzeW5jIGxpc3RBbGwobGlzdFJlZjogU3RvcmFnZVJlZmVyZW5jZSk6IFByb21pc2U8TGlzdFJlc3VsdD4ge1xuICAgIHJldHVybiBhd2FpdCBsaXN0QWxsKGxpc3RSZWYpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwbG9hZHMgYSBmaWxlIHRvIEZpcmViYXNlIFN0b3JhZ2Ugd2l0aCBtZXRhZGF0YSBmb3IgY29ycmVjdCBkb3dubG9hZCBiZWhhdmlvci5cbiAgICpcbiAgICogQHBhcmFtIHtTdG9yYWdlUmVmZXJlbmNlfSByZWYgLSBSZWZlcmVuY2UgdG8gdGhlIHRhcmdldCB1cGxvYWQgbG9jYXRpb24uXG4gICAqIEBwYXJhbSB7RmlsZX0gZmlsZSAtIFRoZSBmaWxlIG9iamVjdCB0byB1cGxvYWQuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPFVwbG9hZFJlc3VsdD59IFJlc29sdmVzIHdpdGggdGhlIHVwbG9hZCByZXN1bHRzLlxuICAgKi9cbiAgYXN5bmMgdXBsb2FkRmlsZShyZWY6IFN0b3JhZ2VSZWZlcmVuY2UsIGZpbGU6IEZpbGUpOiBQcm9taXNlPFVwbG9hZFJlc3VsdD4ge1xuICAgIC8qXG4gICAgKiBzZXQgY29udGVudCBkaXNwb3NpdGlvbiB0byBzaG93IGZpbGVuYW1lIGluc3RlYWQgb2YgcGF0aCBvbiBkb3dubG9hZHNcbiAgICAqIGZpbGUgbmFtZSBjYW5ub3QgY29udGFpbiBhIFwiLFwiKGNvbW1hKSwgaXQgd2lsbCBiZSBpbmNsdWRlZCBpbiB0aGVcbiAgICAqIGNvbnRlbnQgZGlzcG9zaXRpb24gKi9cbiAgICBjb25zdCBtZXRhZGF0YSA9IHtcbiAgICAgIGNvbnRlbnREaXNwb3NpdGlvbiA6IGBhdHRhY2htZW50OyBmaWxlbmFtZT0ke2ZpbGUubmFtZX1gLFxuICAgIH07XG4gICAgcmV0dXJuIGF3YWl0IHVwbG9hZEJ5dGVzKHJlZiwgZmlsZSwgbWV0YWRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwbG9hZHMgbXVsdGlwbGUgZmlsZXMgaW4gcGFyYWxsZWwsIG9wdGlvbmFsbHkgcGxhY2luZyB0aGVtIHdpdGhpbiBhIGZvbGRlci5cbiAgICpcbiAgICogQHBhcmFtIHtGaWxlW119IGZpbGVzIC0gQW4gYXJyYXkgb2YgZmlsZSBvYmplY3RzIHRvIHVwbG9hZC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtmb2xkZXJdIC0gT3B0aW9uYWwgZm9sZGVyIG5hbWUgZm9yIHRoZSB1cGxvYWRlZCBmaWxlcy5cbiAgICogQHJldHVybnMge1Byb21pc2U8VXBsb2FkUmVzdWx0W10+fSBSZXNvbHZlcyB3aXRoIGFuIGFycmF5IG9mIHVwbG9hZCByZXN1bHRzLlxuICAgKi9cbiAgYXN5bmMgdXBsb2FkRmlsZXMoZmlsZXM6IEZpbGVbXSwgZm9sZGVyPzogc3RyaW5nKTogUHJvbWlzZTxVcGxvYWRSZXN1bHRbXT4ge1xuICAgIHJldHVybiBQcm9taXNlLmFsbChmaWxlcy5tYXAoYXN5bmMgZmlsZSA9PiB7XG4gICAgICBjb25zdCBwYXRoID0gZm9sZGVyID8gYCR7Zm9sZGVyfS8ke2ZpbGUubmFtZX1gIDogZmlsZS5uYW1lO1xuICAgICAgY29uc3QgZmlsZVJlZiA9IHRoaXMuZ2V0UmVmKHBhdGgpO1xuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMudXBsb2FkRmlsZShmaWxlUmVmLCBmaWxlKTtcbiAgICB9KSk7XG4gIH1cblxuICAvKipcbiAgICogRmV0Y2hlcyBmdWxsIG1ldGFkYXRhIGZvciBhIGZpbGUgaW4gRmlyZWJhc2UgU3RvcmFnZSBhbmRcbiAgICogY29uc3RydWN0cyBhIFN0b3JhZ2VGaWxlIG9iamVjdC5cbiAgICpcbiAgICogQHBhcmFtIHtTdG9yYWdlUmVmZXJlbmNlfSBmaWxlUmVmIC0gQSByZWZlcmVuY2UgdG8gdGhlIGZpbGUuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPFN0b3JhZ2VGaWxlPn0gUmVzb2x2ZXMgd2l0aCB0aGUgU3RvcmFnZUZpbGUgcmVwcmVzZW50YXRpb24uXG4gICAqL1xuICBhc3luYyBpbXBvcnRGaWxlKGZpbGVSZWY6IFN0b3JhZ2VSZWZlcmVuY2UpOiBQcm9taXNlPFN0b3JhZ2VGaWxlPiB7XG4gICAgY29uc3QgbWV0YWRhdGE6IEZ1bGxNZXRhZGF0YSA9IGF3YWl0IGdldE1ldGFkYXRhKGZpbGVSZWYpO1xuICAgIHJldHVybiB7IHR5cGU6ICdmaWxlJywgLi4ubWV0YWRhdGEgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgU3RvcmFnZUZvbGRlciBvYmplY3QgcmVwcmVzZW50aW5nIGEgRmlyZWJhc2UgU3RvcmFnZSBmb2xkZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RvcmFnZVJlZmVyZW5jZX0gZm9sZGVyIC0gQSByZWZlcmVuY2UgdG8gdGhlIGZvbGRlci5cbiAgICogQHJldHVybnMge1N0b3JhZ2VGb2xkZXJ9XG4gICAqL1xuICBpbXBvcnRGb2xkZXIoZm9sZGVyOiBTdG9yYWdlUmVmZXJlbmNlKTogU3RvcmFnZUZvbGRlciB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6ICdmb2xkZXInLFxuICAgICAgbmFtZTogZm9sZGVyLm5hbWUsXG4gICAgICBmdWxsUGF0aDogZm9sZGVyLmZ1bGxQYXRoXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgYSBkaXJlY3QgZG93bmxvYWQgVVJMIGZvciBhIGZpbGUgaW4gRmlyZWJhc2UgU3RvcmFnZS5cbiAgICpcbiAgICogQHBhcmFtIHtTdG9yYWdlUmVmZXJlbmNlfSByZWYgLSBBIHJlZmVyZW5jZSB0byB0aGUgZmlsZS5cbiAgICogQHJldHVybnMge1Byb21pc2U8c3RyaW5nPn0gUmVzb2x2ZXMgd2l0aCB0aGUgZG93bmxvYWQgVVJMIHN0cmluZy5cbiAgICovXG4gIGFzeW5jIGdldERvd25sb2FkVVJMKHJlZjogU3RvcmFnZVJlZmVyZW5jZSk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgcmV0dXJuIGdldERvd25sb2FkVVJMKHJlZik7XG4gIH1cblxuICAvKipcbiAgICogT3BlbnMgYWxsIHByb3ZpZGVkIGZpbGVzIGluIG5ldyBicm93c2VyIHRhYnMgYnkgZ2VuZXJhdGluZyBkb3dubG9hZCBVUkxzXG4gICAqIGFuZCB0cmlnZ2VyaW5nIGRvd25sb2FkIGxpbmtzLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0b3JhZ2VJdGVtW119IGZpbGVzIC0gQW4gYXJyYXkgb2YgU3RvcmFnZUl0ZW0gb2JqZWN0cyByZXByZXNlbnRpbmcgZmlsZXMuXG4gICAqL1xuICBhc3luYyBvcGVuQWxsRmlsZXMoZmlsZXM6IFN0b3JhZ2VJdGVtW10pIHtcbiAgICBjb25zdCBwYXRocyA9IGZpbGVzLm1hcChmaWxlID0+IGZpbGUuZnVsbFBhdGgpO1xuICAgIGNvbnN0IGxpbmtzID0gYXdhaXQgUHJvbWlzZS5hbGwocGF0aHMubWFwKHBhdGggPT4gdGhpcy5nZXRSZWYocGF0aCkpXG4gICAgICAubWFwKHJlZiA9PiB0aGlzLmdldERvd25sb2FkVVJMKHJlZikpKTtcbiAgICBsaW5rcy5mb3JFYWNoKHVybCA9PiB7XG4gICAgICBjb25zdCBhbmNob3IgPSB0aGlzLmNyZWF0ZUFuY2hvckVsZW1lbnQodXJsKTtcbiAgICAgIGFuY2hvci5jbGljaygpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlY3Vyc2l2ZWx5IGRlbGV0ZXMgYSBmb2xkZXIgYW5kIGl0cyBjb250ZW50cyBmcm9tIEZpcmViYXNlIFN0b3JhZ2UuIEhhbmRsZXNcbiAgICogcG90ZW50aWFsIGVycm9ycyBpZiB0aGUgcGh5c2ljYWwgZm9sZGVyIGRvZXNuJ3QgZXhpc3QuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIC0gVGhlIGZ1bGwgcGF0aCBvZiB0aGUgZm9sZGVyIHRvIGRlbGV0ZS5cbiAgICovXG4gIGFzeW5jIGRlbGV0ZUZvbGRlcihwYXRoOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCB7IGl0ZW1zLCBwcmVmaXhlcyB9ID0gYXdhaXQgdGhpcy5saXN0QWxsKHRoaXMuZ2V0UmVmKHBhdGgpKTtcblxuICAgIHRyeSB7XG4gICAgICAvKipcbiAgICAgICAqIFdlIGRvbid0IGtub3cgaWYgcGh5c2ljYWwgZm9sZGVyIGV4aXN0cywgb3IgaXQgaXMgaW5mZXJyZWQgZnJvbVxuICAgICAgICogbmVzdGVkIGZpbGUgcGF0aC5cbiAgICAgICAqXG4gICAgICAgKiBTbyBoZXJlIHdlIGF0dGVtcHQgdG8gZGVsZXRlIHBoeXNpY2FsIHJlcHJlc2VudGF0aW9uLCBidXQgaWYgaXQgZG9lc1xuICAgICAgICogbm90IGV4aXN0LCB3ZSBqdXN0IHN3YWxsb3cgdGhlIGVycm9yLlxuICAgICAgICovXG4gICAgICBhd2FpdCB0aGlzLmRlbGV0ZUZpbGUocGF0aCArIGAlMmZgKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIHF1aWV0bHkgc3dhbGxvdyBhbnkgZXJyb3JzLlxuICAgIH1cblxuICAgIGNvbnN0IHByZWZpeGVzUHJvbWlzZTogUHJvbWlzZTx2b2lkPltdID0gcHJlZml4ZXMubWFwKGFzeW5jIChwcmVmaXgpID0+IHtcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLmRlbGV0ZUZvbGRlcihwcmVmaXguZnVsbFBhdGgpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgZmlsZXNQcm9taXNlOiBQcm9taXNlPHZvaWQ+W10gPSBpdGVtcy5tYXAoYXN5bmMgKGZpbGUpID0+IHtcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLmRlbGV0ZUZpbGUoZmlsZS5mdWxsUGF0aCk7XG4gICAgfSk7XG5cbiAgICBhd2FpdCBQcm9taXNlLmFsbChbLi4uZmlsZXNQcm9taXNlLCAuLi5wcmVmaXhlc1Byb21pc2VdKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGVzIGEgZmlsZSBmcm9tIEZpcmViYXNlIFN0b3JhZ2UuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIC0gVGhlIGZ1bGwgcGF0aCB0byB0aGUgZmlsZS5cbiAgICovXG4gIGFzeW5jIGRlbGV0ZUZpbGUocGF0aDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIGRlbGV0ZU9iamVjdCh0aGlzLmdldFJlZihwYXRoKSk7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlcyBtdWx0aXBsZSBmaWxlcyBvciBmb2xkZXJzIGZyb20gRmlyZWJhc2UgU3RvcmFnZS5cbiAgICpcbiAgICogQHBhcmFtIHtTdG9yYWdlSXRlbVtdfSBpdGVtcyAtIEFuIGFycmF5IG9mIFN0b3JhZ2VJdGVtIG9iamVjdHMuXG4gICAqL1xuICBhc3luYyBkZWxldGVGaWxlcyhpdGVtczogU3RvcmFnZUl0ZW1bXSkge1xuICAgIHJldHVybiBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgIGl0ZW1zLm1hcChhc3luYyAoaXRlbSkgPT4ge1xuICAgICAgICBpZiAoaXRlbT8udHlwZSA9PT0gJ2ZvbGRlcicpIHJldHVybiBhd2FpdCB0aGlzLmRlbGV0ZUZvbGRlcihpdGVtLmZ1bGxQYXRoKVxuICAgICAgICBlbHNlIGlmIChpdGVtPy50eXBlID09PSAnZmlsZScpIHJldHVybiBhd2FpdCB0aGlzLmRlbGV0ZUZpbGUoaXRlbS5mdWxsUGF0aClcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIZWxwZXIgZnVuY3Rpb24gdG8gY3JlYXRlIGEgZG93bmxvYWQgbGluayBlbGVtZW50LlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIC0gVGhlIGRvd25sb2FkIFVSTCBmb3IgdGhlIGZpbGUuXG4gICAqIEByZXR1cm5zIHtIVE1MQW5jaG9yRWxlbWVudH0gQSBjb25maWd1cmVkIGFuY2hvciBlbGVtZW50IGZvciB0cmlnZ2VyaW5nIGEgZG93bmxvYWQuXG4gICAqL1xuICBjcmVhdGVBbmNob3JFbGVtZW50KHVybDogc3RyaW5nKTogSFRNTEFuY2hvckVsZW1lbnQge1xuICAgIGNvbnN0IGE6IEhUTUxBbmNob3JFbGVtZW50ID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgYS5ocmVmID0gdXJsO1xuICAgIGEudGFyZ2V0ID0gJ19ibGFuayc7XG4gICAgYS5yZWwgPSAnbm9vcGVuZXInO1xuICAgIHJldHVybiBhO1xuICB9XG59XG4iXX0=