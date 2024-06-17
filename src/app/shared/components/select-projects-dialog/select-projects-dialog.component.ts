import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ProjectsService } from '../../services/projects.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { SelectionModel } from '@angular/cdk/collections';
import { MatButton } from '@angular/material/button';
import {
  MatListItemAvatar,
  MatListItemLine,
  MatListItemTitle,
  MatListOption,
  MatSelectionList,
} from '@angular/material/list';
import { NgOptimizedImage } from '@angular/common';

export interface SelectProjectsDialogContract {
  title?: string,
  buttonText?: string,
  description?: string,
  initialSelectedProjectIds?: string[],
}
export interface SelectProjectsDialogCloseContract {
  selectedProjectIds: string[],
}

@Component({
  selector: 'aj-select-projects-dialog',
  templateUrl: './select-projects-dialog.component.html',
  styleUrl: './select-projects-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatSelectionList,
    MatListOption,
    MatListItemTitle,
    MatListItemLine,
    MatListItemAvatar,
    NgOptimizedImage,
    MatDialogClose,
  ],
})
export class SelectProjectsDialogComponent implements OnInit {
  private dialogRef = inject(MatDialogRef<SelectProjectsDialogComponent>);
  private projectsService = inject(ProjectsService);
  private contract = inject<SelectProjectsDialogContract>(MAT_DIALOG_DATA);

  protected readonly title = signal('Select Projects');
  description = signal<string | null>(null);
  buttonText = signal('Save');

  projects = toSignal(this.projectsService.getAllProjects$);

  selectedProjectIdsModel = new SelectionModel<string>(true, []);

  ngOnInit() {
    const {
      title, description,
      initialSelectedProjectIds, buttonText,
    } = this.contract;
    if (title) this.title.set(title);
    if (description) this.description.set(description);
    if (buttonText) this.buttonText.set(buttonText);
    if (initialSelectedProjectIds?.length) {
      this.selectedProjectIdsModel.setSelection(...initialSelectedProjectIds);
    }
  }

  onSaveBtnClick() {
    const contract: SelectProjectsDialogCloseContract = {
      selectedProjectIds: this.selectedProjectIdsModel.selected,
    };
    this.dialogRef.close(contract);
  }
}
