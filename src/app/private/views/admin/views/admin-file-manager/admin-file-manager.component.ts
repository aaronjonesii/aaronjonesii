import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TopAppBarComponent } from "../../../../../shared/components/top-app-bar/top-app-bar.component";
import { FileManagerComponent } from "../../shared/file-manager/file-manager.component";

@Component({
  selector: 'aj-admin-file-manager',
  templateUrl: './admin-file-manager.component.html',
  styleUrl: './admin-file-manager.component.scss',
  standalone: true,
  imports: [
    TopAppBarComponent,
    FileManagerComponent,
  ],
})
export class AdminFileManagerComponent {
  readonly title = 'File manager';
  readonly firebaseStorageURL = `https://console.firebase.google.com/project/${environment.firebase.projectId}/storage/${environment.firebase.storageBucket}/files`;
}
