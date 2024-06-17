import { Component, input } from '@angular/core';

@Component({
  selector: 'aj-project-tags',
  templateUrl: './project-tags.component.html',
  styleUrl: './project-tags.component.scss',
  standalone: true,
  imports: [],
})
export class ProjectTagsComponent {
  tags = input<string[]>([]);
}
