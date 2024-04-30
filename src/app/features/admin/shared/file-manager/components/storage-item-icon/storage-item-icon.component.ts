import { Component, Input } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'aj-storage-item-icon',
  templateUrl: './storage-item-icon.component.html',
  styleUrl: './storage-item-icon.component.scss',
  standalone: true,
  imports: [
    MatIconModule,
  ],
})
export class StorageItemIconComponent {
  @Input()
  public type: 'file' | 'folder' = 'folder';

  @Input()
  public contentType!: string;

  // todo: add custom icons for below content types
  // This is copied as is from firebase-tools-ui
  // https://github.com/firebase/firebase-tools-ui/blob/8ad31d748f687bbb04b838430c460121f9a8e338/src/components/Storage/common/StorageFileIcon/StorageFileIcon.tsx
  private readonly MIME_TYPE_ICON_MAP: Record<string, string> = {
    // adobe illustrator
    'application/illustrator': 'drive_ai',
    // microsoft word
    'application/msword': 'drive_ms_word',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      'drive_ms_word',
    // microsoft powerpoint
    'application/vnd.ms-powerpoint': 'drive_ms_powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation':
      'drive_ms_powerpoint',
    // microsoft excel
    'application/vnd.ms-excel': 'drive_ms_excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      'drive_ms_excel',
    // adobe acrobat
    'application/pdf': 'drive_pdf',
    // adobe photoshop
    'application/photoshop': 'drive_ps',
    'application/psd': 'drive_ps',
    'application/x-photoshop': 'drive_ps',
    'image/photoshop': 'drive_ps',
    'image/psd': 'drive_ps',
    'image/x-photoshop': 'drive_ps',
    'image/x-psd': 'drive_ps',
    // images
    'image/gif': 'photo',
    'image/jpg': 'photo',
    'image/jpeg': 'photo',
    'image/png': 'photo',
    'image/svg+xml': 'photo',
    'image/webp': 'photo',
    // audio
    'audio/m4a': 'drive_audio',
    'audio/mp3': 'drive_audio',
    'audio/mpeg': 'drive_audio',
    'audio/wav': 'drive_audio',
    'audio/x-ms-wma': 'drive_audio',
    // video
    'video/avi': 'video_file',
    'video/mp4': 'video_file',
    'video/mpeg': 'video_file',
    'video/quicktime': 'video_file',
    'video/x-ms-wmv': 'video_file',
    'video/x-matroska': 'video_file',
    'video/webp': 'video_file',
    // zip, csv, tsv
    'application/zip': 'drive_zip',
    'application/csv': 'csv',
    'text/csv': 'csv',
    'text/tsv': 'tsv',
    'text/tab-separated-values': 'tsv',
    // text documents
    'text/javascript': 'javascript',
    'text/plain': 'text_snippet',
    'text/x-log': 'drive_document',
  } as const;
  private readonly DEFAULT_MIME_TYPE_ICON = 'drive_file';
  public getFileIcon(contentType: string) {
    return this.MIME_TYPE_ICON_MAP[contentType] || this.DEFAULT_MIME_TYPE_ICON;
  }
}
