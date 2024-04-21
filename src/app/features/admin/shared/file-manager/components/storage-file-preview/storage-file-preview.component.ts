import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { StorageFile } from '../../interfaces/storage-file';
import { FirebaseStorageService } from '../../services/firebase-storage.service';
import { FirebaseError } from '@angular/fire/app/firebase';
import { StorageItemIconComponent } from "../storage-item-icon/storage-item-icon.component";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { FormatBytesPipe } from "../../pipes/format-bytes.pipe";
import { DatePipe, NgOptimizedImage } from "@angular/common";
import { ConsoleLoggerService } from "../../../../../../shared/services/console-logger.service";

@Component({
  selector: 'aj-storage-file-preview',
  templateUrl: './storage-file-preview.component.html',
  styleUrl: './storage-file-preview.component.scss',
  standalone: true,
  imports: [
    StorageItemIconComponent,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    FormatBytesPipe,
    DatePipe,
    NgOptimizedImage,
  ],
})
export class StorageFilePreviewComponent implements OnChanges {
  @Input()
  item?: StorageFile;

  @Output()
  readonly _close: EventEmitter<undefined> = new EventEmitter<undefined>();

  downloadURL: string | undefined;

  previewError = false;

  constructor(
    private firebaseStorage: FirebaseStorageService,
    private logger: ConsoleLoggerService,
  ) {}

  ngOnChanges() {
    if (!this.item) return;

    this.firebaseStorage.getDownloadURL(this.firebaseStorage.getRef(this.item.fullPath))
      .then((downloadURL) => {
        this.downloadURL = downloadURL;
      }).catch((error: FirebaseError) => {
      this.logger.error(`error getting download URL for '${this.item?.name}'`, error, this.item);
    });
  }
}
