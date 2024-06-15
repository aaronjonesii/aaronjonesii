import { Component, inject, OnInit } from '@angular/core';
import {
  TechnologiesService,
} from '../../../../shared/services/technologies.service';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  TopAppBarService,
} from '../../../../shared/components/top-app-bar/top-app-bar.service';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'aj-admin-technologies',
  templateUrl: './admin-technologies.component.html',
  styleUrl: './admin-technologies.component.scss',
  standalone: true,
  imports: [
    NgOptimizedImage,
  ],
})
export class AdminTechnologiesComponent implements OnInit {
  private technologiesService = inject(TechnologiesService);
  private topAppBarService = inject(TopAppBarService);

  protected readonly title = 'Technologies';

  technologies = toSignal(this.technologiesService.getTechnologies$);

  ngOnInit() {
    this.topAppBarService.setOptions({
      title: `Admin ${this.title}`,
      loading: false,
      showBackBtn: true,
    });
  }
}
