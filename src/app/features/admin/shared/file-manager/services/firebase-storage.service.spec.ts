import { TestBed } from '@angular/core/testing';
import { FirebaseStorageService } from './firebase-storage.service';
import {
  connectStorageEmulator,
  getStorage,
  provideStorage,
  StorageReference,
  UploadResult,
} from '@angular/fire/storage';
import {
  initializeApp, provideFirebaseApp, FirebaseError,
} from '@angular/fire/app';
import {
  mockFile,
  mockFileList,
  mockStorageFile,
  mockStorageFolder, mockUploadResult,
} from '../mocks/files.mock';
import { StorageItem } from '../interfaces';
import { DOCUMENT } from '@angular/common';
import { MockStorageRef } from '../mocks/storage.mock';
import { environment } from '../../../../../../environments/environment';

describe('FirebaseStorageService', () => {
  let service: FirebaseStorageService;
  const getFolderPath = (methodName: string) => {
    return `unit-tests/FirebaseStorageService/${methodName}`;
  };
  const getFilePath = (filename: string, folderPath?: string) => {
    return folderPath ? `${folderPath}/${filename}` : filename;
  };

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideStorage(() => {
          const storage = getStorage();
          connectStorageEmulator(storage, 'localhost', 9199);
          return storage;
        }),
      ],
    });

    service = TestBed.inject(FirebaseStorageService);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  describe('getRef', () => {
    it('should return a StorageReference with the correct path', () => {
      const folderPath = getFolderPath('getRef');
      const path = getFilePath('test-path', folderPath);
      const testRef = service.getRef(path);

      expect(testRef.name).toBe('test-path');
      expect(testRef.fullPath).toBe(path);
    });
  });

  describe('listAll', () => {
    it('should handle unauthorized access errors', (done) => {
      const folderPath = getFolderPath('listAll');
      const path = getFilePath('test-unauthorized', folderPath);
      const rootRef = service.getRef(path);

      service.listAll(rootRef).then(() => {
        fail(`Should have thrown 'storage/unauthorized' error`);
        done();
      }).catch((error: FirebaseError) => {
        expect(error.code).toBe('storage/unauthorized');
        done();
      });
    });
  });

  describe('uploadFile', () => {
    it('should upload a file and return metadata', async () => {
      const folderPath = getFolderPath('uploadFile');
      const path = getFilePath(mockFile.name, folderPath);
      const testRef = service.getRef(path);
      const uploadResult = await service.uploadFile(testRef, mockFile);

      expect(uploadResult.metadata.name).toBe(mockFile.name);
    });

    it('should handle errors during upload', (done) => {
      const folderPath = getFolderPath('uploadFile');
      const path = getFilePath('test-unauthorized', folderPath);
      const testRef = service.getRef(path);

      service.uploadFile(testRef, mockFile)
        .then(() => {
          fail(`Should have thrown 'storage/unauthorized' error`);
          done();
        })
        .catch((error: FirebaseError) => {
          expect(error.code).toBe('storage/unauthorized');
          done();
        });
    });
  });

  describe('uploadFiles', () => {
    // eslint-disable-next-line max-len
    it('should call getRef with file name when folder is not provided', async () => {
      spyOn(service, 'getRef').and.callFake((path) => {
        return new MockStorageRef(path);
      });
      spyOn(service, 'uploadFile').and.callFake((ref, file) => {
        return Promise.resolve(mockUploadResult(<MockStorageRef>ref, file));
      });

      const files = Array.from(mockFileList);
      await service.uploadFiles(files);

      expect(service.getRef)
        .toHaveBeenCalledWith(<string>mockFileList.item(0)?.name);
    });

    // eslint-disable-next-line max-len
    it('should call getRef with created path from provided folder', async () => {
      spyOn(service, 'getRef').and.callThrough();

      const files = Array.from(mockFileList);
      const folderPath = getFolderPath('uploadFiles');
      await service.uploadFiles(files, folderPath);

      const filePath = getFilePath(files[0].name, folderPath);
      expect(service.getRef).toHaveBeenCalledWith(filePath);
      expect(service.getRef).toHaveBeenCalledTimes(files.length);
    });

    it('should call uploadFile with files', async () => {
      spyOn(service, 'uploadFile');

      const files = Array.from(mockFileList);
      const folderPath = getFolderPath('uploadFiles');
      await service.uploadFiles(files, folderPath);

      expect(service.uploadFile).toHaveBeenCalledTimes(files.length);
    });
  });

  describe('importFile', () => {
    let fileRef: StorageReference;
    let uploadResult: UploadResult;

    beforeEach(async () => {
      const folderPath = getFolderPath('importFile');
      const filePath = getFilePath(mockFile.name, folderPath);
      fileRef = service.getRef(filePath);
      uploadResult = await service.uploadFile(fileRef, mockFile);
    });

    // eslint-disable-next-line max-len
    it('should return StorageFile with provided file StorageReference', async () => {
      const storageFile = await service.importFile(uploadResult.ref);

      expect(storageFile.type).toBe('file');
      expect(storageFile.name).toBe(uploadResult.metadata.name);
    });
  });

  describe('importFolder', () => {
    // eslint-disable-next-line max-len
    it('should return StorageFolder with provided folder StorageReference', () => {
      const folderPath = getFolderPath('importFolder');
      const path = getFilePath('test-folder', folderPath);
      const folderRef = service.getRef(path);
      const storageFolder = service.importFolder(folderRef);

      expect(storageFolder.type).toBe('folder');
      expect(storageFolder.name).toBe('test-folder');
    });
  });

  describe('getDownloadURL', () => {
    // eslint-disable-next-line max-len
    it('should return download url string of provided StorageReference', async () => {
      const folderPath = getFolderPath('getDownloadURL');
      const filePath = getFilePath(mockFile.name, folderPath);
      const fileRef = service.getRef(filePath);
      const uploadResult = await service.uploadFile(fileRef, mockFile);
      const fileDownloadURL = await service.getDownloadURL(uploadResult.ref);

      expect(fileDownloadURL).toBeDefined();
    });
  });

  describe('openAllFiles', () => {
    const mockAnchor = {
      click: jasmine.createSpy('click'),
    } as unknown as HTMLAnchorElement;
    let uploadResults: UploadResult[];
    let storageItems: StorageItem[];

    beforeEach(async () => {
      spyOn(service, 'createAnchorElement').and.returnValue(mockAnchor);

      const files = Array.from(mockFileList);
      const folderPath = getFolderPath('openAllFiles');
      uploadResults = await service.uploadFiles(files, folderPath);
      storageItems = await Promise.all(
        uploadResults.map((ur) => service.importFile(ur.ref)),
      );
    });

    it('should call getRef with provided files path', async () => {
      spyOn(service, 'getRef').and.callThrough();

      await service.openAllFiles(storageItems);

      expect(service.getRef).toHaveBeenCalledWith(storageItems[0].fullPath);
      expect(service.getRef).toHaveBeenCalledWith(storageItems[1].fullPath);
      expect(service.getRef).toHaveBeenCalledTimes(storageItems.length);
    });

    it('should call getDownloadURL', async () => {
      spyOn(service, 'getDownloadURL').and.callThrough();

      await service.openAllFiles(storageItems);

      expect(service.getDownloadURL).toHaveBeenCalledTimes(storageItems.length);
    });

    it('should call createAnchorElement', async () => {
      await service.openAllFiles(storageItems);

      expect(service.createAnchorElement)
        .toHaveBeenCalledTimes(storageItems.length);
    });

    it('should call click on the created anchor element', async () => {
      await service.openAllFiles(storageItems);

      expect(mockAnchor.click).toHaveBeenCalled();
    });
  });

  describe('deleteFolder', () => {
    it('should call deleteFile with provided path', async () => {
      spyOn(service, 'deleteFile');

      const folderPath = getFolderPath('deleteFolder');
      const path = getFilePath('test-folder', folderPath);
      await service.deleteFolder(path);

      expect(service.deleteFile).toHaveBeenCalledWith(path + '%2f');
    });

    it('should call deleteFolder with prefixes fullPath', async () => {
      spyOn(service, 'deleteFile').and.callThrough();
      spyOn(service, 'deleteFolder').and.callThrough();

      const folderPath = getFolderPath('deleteFolder');
      const removeFolderPath = `${folderPath}/test-folder`;

      /** upload two files to the folder */
      const files = Array.from(mockFileList);
      await service.uploadFiles(files, removeFolderPath);

      /** create a new folder and upload a file into it */
      const newFolderPath = `${removeFolderPath}/new-folder`;
      const newFolderFilePath = getFilePath(mockFile.name, newFolderPath);
      const newFolderFileRef = service.getRef(newFolderFilePath);
      await service.uploadFile(newFolderFileRef, mockFile);

      await service.deleteFolder(removeFolderPath);

      expect(service.deleteFolder).toHaveBeenCalledTimes(2);
      expect(service.deleteFile).toHaveBeenCalledTimes(5);
    });
  });

  describe('deleteFile', () => {
    let uploadResults: UploadResult[];

    beforeEach(async () => {
      const folderPath = getFolderPath('deleteFile');
      const files = Array.from(mockFileList);
      uploadResults = await service.uploadFiles(files, folderPath);
    });

    it('should call getRef with provided path', async () => {
      spyOn(service, 'getRef').and.callThrough();

      expect(uploadResults.length).toBeGreaterThan(0);

      const path = uploadResults[0].ref.fullPath;
      await service.deleteFile(path);

      expect(service.getRef).toHaveBeenCalledWith(path);
    });

    it('should delete object with provided path', async () => {
      spyOn(service, 'deleteFile');

      expect(uploadResults.length).toBeGreaterThan(0);

      const path = uploadResults[0].ref.fullPath;
      await service.deleteFile(path);

      expect(service.deleteFile).not.toThrowError();
    });

    // eslint-disable-next-line max-len
    it('should return storage/object-not-found error if file does not exist', (done) => {
      const folderPath = getFolderPath('deleteFile');
      const path = getFilePath('test-object-not-found', folderPath);
      service.deleteFile(path)
        .then(() => {
          fail(`Should have thrown 'storage/object-not-found' error`);
          done();
        }).catch((error: FirebaseError) => {
          expect(error.code).toBe('storage/object-not-found');
          done();
      });
    });
  });

  describe('deleteFiles', () => {
    it('should call deleteFolder when provided StorageFolder', async () => {
      spyOn(service, 'deleteFolder');

      const folderPath = getFolderPath('deleteFiles');
      const path = getFilePath('test-folder', folderPath);
      const folderRef = service.getRef(path);
      await service.deleteFiles([mockStorageFolder(folderRef)]);

      expect(service.deleteFolder).toHaveBeenCalledWith(folderRef.fullPath);
    });

    it('should call deleteFile when provided StorageFile', async () => {
      spyOn(service, 'deleteFile');

      const folderPath = getFolderPath('deleteFiles');
      const path = getFilePath('test-file', folderPath);
      const fileRef = service.getRef(path);
      await service.deleteFiles([mockStorageFile(fileRef)]);

      expect(service.deleteFile).toHaveBeenCalledWith(fileRef.fullPath);
    });
  });

  describe('createAnchorElement', () => {
    it('should call document.createElement', () => {
      const document = TestBed.inject(DOCUMENT);

      spyOn(document, 'createElement').and.callThrough();

      service.createAnchorElement('test-url');

      expect(document.createElement).toHaveBeenCalledWith('a');
    });

    it('should return HTMLAnchorElement', () => {
      const document = TestBed.inject(DOCUMENT);

      spyOn(document, 'createElement').and.callThrough();

      const anchor = service.createAnchorElement('test-url');

      expect(anchor instanceof HTMLAnchorElement).toBeTrue();
    });
  });
});
