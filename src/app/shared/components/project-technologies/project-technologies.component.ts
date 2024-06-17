import { Component, input } from '@angular/core';
import { Technology } from '../../interfaces/technology';
import { navPath } from '../../../app.routes';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'aj-project-technologies',
  templateUrl: './project-technologies.component.html',
  styleUrl: './project-technologies.component.scss',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    MatTooltip,
  ],
})
export class ProjectTechnologiesComponent {
  technologies = input<Technology[]>([]);
  protected readonly navPath = navPath;
}
