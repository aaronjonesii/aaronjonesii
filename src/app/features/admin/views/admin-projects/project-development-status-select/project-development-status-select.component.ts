import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  ProjectDevelopmentStatus,
} from '../../../../../shared/interfaces/project';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { KeyValuePipe } from '@angular/common';

@Component({
  selector: 'aj-project-development-status-select',
  templateUrl: './project-development-status-select.component.html',
  styleUrl: './project-development-status-select.component.scss',
  standalone: true,
  imports: [
    MatLabel,
    MatOption,
    MatSelect,
    MatFormField,
    KeyValuePipe,
    ReactiveFormsModule,
  ],
})
export class ProjectDevelopmentStatusSelectComponent {
  protected readonly ProjectDevelopmentStatus = ProjectDevelopmentStatus;

  developmentStatusFormControl = input(
    new FormControl<ProjectDevelopmentStatus | null>(null),
  );
}
