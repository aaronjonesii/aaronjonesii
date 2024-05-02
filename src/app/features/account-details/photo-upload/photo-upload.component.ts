import { afterNextRender, Component, Input, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  UserPhotoComponent,
} from '../../../shared/components/user-photo/user-photo.component';
import { StorageService } from '../../../shared/services/storage.service';
import { first } from 'rxjs';
import {
  ConsoleLoggerService,
} from '../../../shared/services/console-logger.service';
import { AuthService } from '../../../shared/services/auth.service';


@Component({
  selector: 'aj-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrl: './photo-upload.component.scss',
  standalone: true,
  imports: [
    UserPhotoComponent,
    MatButtonModule,
    MatIconModule,
  ],
})
export class PhotoUploadComponent implements OnInit {
  @Input() user: User | null = null;
  photo?: string;
  validExtensions = [];
  file?: File;
  loading = false;

  constructor(
    private auth: AuthService,
    private storage: StorageService,
    private logger: ConsoleLoggerService,
  ) {}

  ngOnInit() {
    this.photo = <string> this.user?.photoURL;
  }

  async onFilesSelect(event: Event) {
    try {
      this.loading = true;

      this.file = ((event.target as HTMLInputElement).files as FileList)[0];
      if (!this.file) return;

      /** split file name by '.' and return last item in array */
      const fileExtension = this.file.name
        .split('.')[this.file.name.split('.').length - 1];

      await this.storage.uploadBytes(
        `users/${this.user?.uid}/avatar.${fileExtension}`,
        this.file,
      )
        .catch(() => {
          throw new Error('Something went wrong uploading photo');
        }).then(async (uploadResult) => {
          return await this.storage.getURL(uploadResult.ref);
        })
        .catch(() => {
          throw new Error(`Something went wrong loading photo url`);
        }).then(async (url) => {
          this.photo = url;
          return this.auth.updateUser({ photoURL: url });
        }).catch(() => {
          throw new Error(`Something went wrong updating profile`);
        }).then((res) => this.notifyReload(res.message));
    } catch (error) {
      this.logger.error(
        (<Error>error).message ?? `Something went wrong uploading photo`,
        error, this.file, this.user,
      );
    } finally {
      this.loading = false;
    }
  }

  async clear() {
    this.loading = true;
    await this.auth.updateUser({ photoURL: null })
      .then((res) => this.notifyReload(res.message))
      .catch((error: Error) => {
        this.logger.error(`Something went wrong updating profile`, error);
      });
    this.photo = undefined;
    this.loading = false;
  }

  notifyReload(msg: string) {
    this.logger.openSnackBar(
      msg + '; Reload page for changes to take affect.',
      'Reload',
      { duration: 0 }
    ).onAction().pipe(first()).forEach(() => {
      afterNextRender(() => {
        window.location.reload();
      });
    });
  }
}
