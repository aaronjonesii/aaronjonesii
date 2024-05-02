import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA, MatDialogModule, MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'aj-new-folder-dialog',
  templateUrl: './new-folder-dialog.component.html',
  styleUrl: './new-folder-dialog.component.scss',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
  ],
})
export class NewFolderDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<NewFolderDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { folder: { name: string, path: string } }
  ) {}
}
