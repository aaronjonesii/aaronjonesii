import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'aj-delete-files-dialog',
  templateUrl: './delete-files-dialog.component.html',
  styleUrl: './delete-files-dialog.component.scss',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
  ],
})
export class DeleteFilesDialogComponent {
  constructor(private dialogRef: MatDialogRef<DeleteFilesDialogComponent>) {}
}
