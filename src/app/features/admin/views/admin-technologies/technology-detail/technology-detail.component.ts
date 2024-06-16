import {
  ChangeDetectionStrategy,
  Component,
  inject, OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  TechnologiesService,
} from '../../../../../shared/services/technologies.service';
import { map, of, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  TopAppBarService,
} from '../../../../../shared/components/top-app-bar/top-app-bar.service';
import { NgOptimizedImage } from '@angular/common';
import {
  MatListItem, MatListItemAvatar, MatListItemLine,
  MatListItemTitle,
  MatNavList,
} from '@angular/material/list';
import {
  ProjectsService,
} from '../../../../../shared/services/projects.service';

@Component({
  selector: 'aj-technology-detail',
  templateUrl: './technology-detail.component.html',
  styleUrl: './technology-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgOptimizedImage,
    MatNavList,
    MatListItem,
    MatListItemTitle,
    MatListItemLine,
    MatListItemAvatar,
  ],
})
export class TechnologyDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private technologyService = inject(TechnologiesService);
  private topAppBarService = inject(TopAppBarService);
  private projectsService = inject(ProjectsService);

  protected readonly title = 'Technology Detail';
  private technologyId$ = this.route.paramMap.pipe(
    map((paramMap) => paramMap.get('technologyId')),
  );
  private technology$ = this.technologyId$.pipe(
    switchMap((id) => {
      return id ? this.technologyService.getTechnology$(id) : of(null);
    }),
  );
  technology = toSignal(this.technology$);
  projects = toSignal(
    this.technology$.pipe(
      switchMap((technology) => {
        return technology ?
          this.projectsService.getProjectsByTechnology$(technology.id) :
          of(null);
      }),
    ),
  );

  ngOnInit() {
    this.topAppBarService.setOptions({
      title: `Admin ${this.title}`,
      loading: false,
      showBackBtn: true,
    });
  }
}
