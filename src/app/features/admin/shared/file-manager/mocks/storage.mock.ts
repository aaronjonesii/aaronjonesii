import { StorageReference, FirebaseStorage } from '@angular/fire/storage';

export class MockStorageRef implements StorageReference {
  root = this;
  bucket = 'mock-bucket';
  fullPath = 'mock-fullPath';
  name = 'mock-name';
  storage = 'mock-storage' as unknown as FirebaseStorage;
  parent = null;

  constructor(path: string) {
    const pathArray = path.split('/');
    this.name = pathArray[pathArray.length - 1];
    this.fullPath = path.startsWith('/') ? path : `/${path}`;
  }
}
