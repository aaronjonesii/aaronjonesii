import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'aj-admin-file-manager',
  templateUrl: './admin-file-manager.component.html',
  styleUrls: ['./admin-file-manager.component.scss']
})
export class AdminFileManagerComponent {
  public readonly title = 'File manager';
  public readonly firebaseStorageURL = `https://console.firebase.google.com/project/${environment.firebase.projectId}/storage/${environment.firebase.storageBucket}/files`;
}
