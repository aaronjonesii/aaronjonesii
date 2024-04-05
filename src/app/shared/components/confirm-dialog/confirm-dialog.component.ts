import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'aj-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
  ],
})
export class ConfirmDialogComponent {
  title?: string;
  description = 'This action is irreversible, be careful.';
  buttonText = 'Confirm';

  constructor(@Inject(MAT_DIALOG_DATA) private data: {
    title?: string,
    description: string,
    buttonText?: string,
  }) {
    this.title = this.data.title;
    this.description = this.data.description;
    if (this.data.buttonText) this.buttonText = this.data.buttonText;
  }
}
