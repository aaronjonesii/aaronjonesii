import { Component, Input } from '@angular/core';
import { FormControl } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { NgOptimizedImage } from "@angular/common";
import { SafePipe } from "../../../../../shared/pipes/safe.pipe";
import { StorageService } from "../../../../../shared/services/storage.service";
import { ConsoleLoggerService } from "../../../../../shared/services/console-logger.service";

@Component({
  selector: 'aj-project-image',
  templateUrl: './project-image.component.html',
  styleUrl: './project-image.component.scss',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    SafePipe,
    NgOptimizedImage,
  ],
})
export class ProjectImageComponent {
  @Input() imageFormControl = new FormControl<string | null>(null);
  imageError: ErrorEvent | null = null;
  @Input() allowedFileTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/svg+xml'];
  loading = false;

  constructor(
    private storage: StorageService,
    private logger: ConsoleLoggerService,
  ) {}

  async onFileUpload(event: Event) {
    this.loading = true;

    const inputEl = event.target as HTMLInputElement;
    if (inputEl.files?.length) {
      const image = inputEl.files[0];
      const filenameArray = image.name.split('.');
      const imageExtension = filenameArray.at(-1);
      const imageFileName = filenameArray.slice(0, -1).join('.');
      const path = `projects/${imageFileName}_${Date.now()}.${imageExtension}`;
      await this.storage.uploadBytes(path, inputEl.files[0])
        .then(async uploadResult => {
          await this.storage.getURL(uploadResult.ref)
            .then(url => this.imageFormControl.setValue(url))
            .catch(error => this.logger.error('Something went wrong loading uploaded image download url', [error, uploadResult]))
        }).catch(error => this.logger.error(`Something went wrong uploading image`, [error, image]));
    }

    this.loading = false;
  }
}
