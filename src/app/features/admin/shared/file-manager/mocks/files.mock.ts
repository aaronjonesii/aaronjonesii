import { MockStorageRef } from './storage.mock';
import {
  FirebaseStorage, FullMetadata, ListResult, StorageReference, UploadResult,
} from '@angular/fire/storage';
import { StorageFile, StorageFolder, StorageItem } from '../interfaces';

export const mockInvalidFile = new File(
  ['mock content'],
  'mockInvalidName,txt',
  { type: 'text/plain' },
);
export const mockFile = new File(
  ['mock content'],
  'mockFile.txt',
  { type: 'text/plain' },
);
export const mockFile2 = new File(
  ['mock content'],
  'mockImage.jpg',
  { type: 'image/jpeg' },
);
export const mockInvalidFileList: FileList = {
  0: mockFile,
  1: mockInvalidFile,
  length: 2,
  item: (index: number) => [mockFile, mockInvalidFile][index],
};
export const mockFileList: FileList = {
  0: mockFile,
  1: mockFile2,
  length: 2,
  item: (index: number) => [mockFile, mockFile2][index],
};
export const mockFullMetadata = (
  ref: MockStorageRef | StorageReference,
  file?: File,
): FullMetadata => ({
  bucket: ref.bucket,
  customMetadata: {},
  generation: '',
  metageneration: '',
  downloadTokens: [],
  ref: ref,
  fullPath: ref.fullPath,
  size: file?.size ?? 0,
  updated: '',
  timeCreated: '',
  name: file?.name ?? ref.name,
});

export const mockUploadResult = (
  ref: MockStorageRef,
  file?: File,
): UploadResult => ({
  metadata: mockFullMetadata(ref, file),
  ref: ref as unknown as StorageReference,
});

export const mockFileUploadError = (fileName: string) => {
  return new Error(`Simulated file upload error for ${fileName}`);
};

export const mockListResult = (
  ref: MockStorageRef | StorageReference,
): ListResult => ({
  items: [{
    name: 'mock-file',
    type: 'file',
    size: 0,
    updated: '',
    timeCreated: '',
    fullPath: ref.fullPath,
    bucket: ref.bucket,
    customMetadata: {},
    generation: '',
    metageneration: '',
    downloadTokens: [],
    ref: ref,
    root: ref,
    storage: {} as unknown as FirebaseStorage,
    parent: null,
  }],
  prefixes: [{
    name: 'mock-folder',
    type: 'folder',
    fullPath: ref.fullPath,
    root: ref,
    bucket: ref.bucket,
    storage: {} as unknown as FirebaseStorage,
    parent: null,
  }],
}) as unknown as ListResult;

export const mockStorageFolder = (
  ref: MockStorageRef | StorageReference,
): StorageFolder => {
  return {
    type: 'folder',
    name: 'mock-folder',
    fullPath: ref.fullPath,
  };
};

export const mockStorageFile = (
  ref: MockStorageRef | StorageReference,
): StorageFile => {
  return {
    type: 'file',
    ...mockFullMetadata(ref),
  };
};

export const mockStorageItems = (
  ref: MockStorageRef | StorageReference,
): StorageItem[] => {
  const listResult = mockListResult(ref);
  return [
    ...listResult.prefixes.map(mockStorageFolder),
    ...listResult.items.map(mockStorageFile),
  ];
};
