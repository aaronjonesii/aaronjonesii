import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'aj-delete-files-dialog',
  templateUrl: './delete-files-dialog.component.html',
  styleUrls: ['./delete-files-dialog.component.scss']
})
export class DeleteFilesDialogComponent {
  constructor(public dialogRef: MatDialogRef<DeleteFilesDialogComponent>,) { }
}
