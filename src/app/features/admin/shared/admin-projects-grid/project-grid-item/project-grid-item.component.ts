import {
  Component,
  computed,
  input,
  model,
  output,
} from '@angular/core';
import { navPath } from '../../../../../app.routes';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { NgOptimizedImage } from '@angular/common';
import {
  ProjectStatus,
  ProjectWithTech,
} from '../../../../../shared/interfaces/project';
import { RouterLink } from '@angular/router';
import { MatTooltip } from '@angular/material/tooltip';
// eslint-disable-next-line max-len
import { ProjectTechnologiesComponent } from '../../../../../shared/components/project-technologies/project-technologies.component';

@Component({
  selector: 'aj-project-grid-item',
  templateUrl: './project-grid-item.component.html',
  styleUrl: './project-grid-item.component.scss',
  standalone: true,
  imports: [
    MatCheckbox,
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    NgOptimizedImage,
    RouterLink,
    MatTooltip,
    MatMenuTrigger,
    ProjectTechnologiesComponent,
  ],
})
export class ProjectGridItemComponent {
  protected readonly navPath = navPath;

  project = input<ProjectWithTech>();

  isSelected = input(false);

  checkboxToggled = output<ProjectWithTech | undefined>();

  loading = model(false);

  featureBtnClick = output<ProjectWithTech | undefined>();

  publishBtnClick = output<ProjectWithTech | undefined>();

  deleteBtnClick = output<ProjectWithTech | undefined>();

  isPublished = computed(() => {
    return this.project()?.visibility === 'public' &&
      this.project()?.status !== 'draft';
  });

  isUnpublished = computed(() => {
    return this.project()?.status !== 'published';
  });

  featureBtnTooltip = computed(() => {
    return `${this.project()?.featured ? 'Unfeature' : 'Feature'} this project`;
  });

  isPublic = computed(() => {
    return this.project()?.visibility === 'public';
  });
  protected readonly ProjectStatus = ProjectStatus;
}
