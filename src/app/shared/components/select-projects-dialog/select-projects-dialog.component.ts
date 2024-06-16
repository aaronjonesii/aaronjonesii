import {
  ChangeDetectionStrategy,
  Component,
  computed,
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
import { ProjectWithID } from '../../interfaces/project';
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
  description?: string,
}
export interface SelectProjectsDialogCloseContract {
  selectedProjects: ProjectWithID[],
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

  projects = toSignal(this.projectsService.getAllProjects$);

  selectedModel = new SelectionModel<ProjectWithID>(true, []);
  selectedChangeSignal = toSignal(this.selectedModel.changed);

  selectBtnText = computed(() => {
    const selectedProjects = this.selectedChangeSignal()?.source.selected;
    const defaultText = 'Select Project';
    const isSingular = selectedProjects?.length === 1;
    if (!selectedProjects || !selectedProjects.length || isSingular) {
      return defaultText;
    }

    // eslint-disable-next-line max-len
    return `Select ${selectedProjects.length} ${isSingular ? 'Project' : 'Projects'}`;
  });

  ngOnInit() {
    const { title, description } = this.contract;
    if (title) this.title.set(title);
    if (description) this.description.set(description);
  }

  onSelectProjects() {
    if (this.selectedModel.isEmpty()) return;

    const contract: SelectProjectsDialogCloseContract = {
      selectedProjects: this.selectedModel.selected,
    };
    this.dialogRef.close(contract);
  }
}
