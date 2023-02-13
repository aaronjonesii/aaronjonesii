import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { StorageFile } from '../../interfaces/storage-file';
import { FirebaseStorageService } from '../../services/firebase-storage.service';
import { FirebaseError } from '@angular/fire/app/firebase';
import { ConsoleLoggerService } from 'src/app/core/services/console-logger.service';

@Component({
  selector: 'storage-file-preview',
  templateUrl: './storage-file-preview.component.html',
  styleUrls: ['./storage-file-preview.component.scss']
})
export class StorageFilePreviewComponent implements OnChanges {
  @Input()
  public item!: StorageFile;

  @Output()
  public close: EventEmitter<any> = new EventEmitter<any>();

  public downloadURL: string | undefined;

  public previewError = false;

  constructor(
    private firebaseStorage: FirebaseStorageService,
    private cLog: ConsoleLoggerService
  ) {}

  async ngOnChanges(changes: SimpleChanges) {
    this.downloadURL = await this.firebaseStorage.getDownloadURL(this.firebaseStorage.getRef(this.item.fullPath))
      .catch((error: FirebaseError) => {
        this.cLog.error(`error getting download URL for '${this.item.name}'`, error, this.item);
        return undefined;
      });
  }
}
