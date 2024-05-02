import { MockStorageRef } from './storage.mock';
import { ListResult, UploadResult } from '@angular/fire/storage';
import { StorageFile, StorageFolder, StorageItem } from '../interfaces';
import {
  mockListResult, mockStorageFile, mockStorageFolder, mockUploadResult,
} from './files.mock';

export class MockFirebaseStorageService {
  getRef(path: string) {
    return new MockStorageRef(path);
  }

  async listAll(ref: MockStorageRef): Promise<ListResult> {
    return mockListResult(ref);
  }

  uploadFile(ref: MockStorageRef, file: File): Promise<UploadResult> {
    return Promise.resolve(mockUploadResult(ref, file));
  }

  async importFile(ref: MockStorageRef): Promise<StorageFile> {
    return mockStorageFile(ref);
  }

  importFolder(ref: MockStorageRef): StorageFolder {
    return mockStorageFolder(ref);
  }

  deleteFiles(items: StorageItem[]): Promise<void[]> {
    return Promise.all(items.map(() => Promise.resolve()));
  }

  async getDownloadURL(ref: MockStorageRef): Promise<string> {
    return ref.fullPath;
  }

  async openAllFiles(files: StorageItem[]): Promise<void> {
    console.group('MockFirebaseStorageService#openAllFiles');
    files.map((f) => console.debug(`open file => ${f.fullPath}`));
    console.groupEnd();
  }
}
