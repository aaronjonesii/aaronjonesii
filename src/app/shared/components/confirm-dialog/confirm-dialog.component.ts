import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'aj-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  public title = 'Are you sure?';
  public description = 'This action is irreversible, be careful.';
  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string, description: string }) {
    this.title = data.title;
    this.description = data.description;
  }
}
