import {
  ChangeDetectionStrategy,
  Component,
  input,
  output
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardActions } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { navPath } from '../../../app.routes';
import {
  ProjectWithTech,
} from '../../interfaces/project';
import { NgOptimizedImage } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';
import {
  ProjectTechnologiesComponent,
} from '../project-technologies/project-technologies.component';
import { ProjectTagsComponent } from '../project-tags/project-tags.component';

@Component({
  selector: 'aj-project-card',
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardActions,
    MatDivider,
    MatIcon,
    RouterLink,
    NgOptimizedImage,
    MatTooltip,
    ProjectTechnologiesComponent,
    ProjectTagsComponent,
  ],
})
export class ProjectCardComponent {
  protected readonly navPath = navPath;

  project = input<ProjectWithTech>();

  shareProject = output<ProjectWithTech | undefined>();
}
