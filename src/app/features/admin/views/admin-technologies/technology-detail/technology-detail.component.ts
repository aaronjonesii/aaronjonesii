import {
  ChangeDetectionStrategy,
  Component,
  inject, OnInit,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  TechnologiesService,
} from '../../../../../shared/services/technologies.service';
import { first, map, of, switchMap } from 'rxjs';
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
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { navPath } from '../../../../../app.routes';
import { MatDialog } from '@angular/material/dialog';
import {
  SelectProjectsDialogCloseContract,
  SelectProjectsDialogComponent, SelectProjectsDialogContract,
// eslint-disable-next-line max-len
} from '../../../../../shared/components/select-projects-dialog/select-projects-dialog.component';
import {
  ConsoleLoggerService,
} from '../../../../../shared/services/console-logger.service';

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
    MatIcon,
    MatButton,
    RouterLink,
  ],
})
export class TechnologyDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private technologyService = inject(TechnologiesService);
  private topAppBarService = inject(TopAppBarService);
  private projectsService = inject(ProjectsService);
  private dialog = inject(MatDialog);
  private logger = inject(ConsoleLoggerService);

  protected readonly navPath = navPath;
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

  onAssignProjectsBtnClick() {
    const initialSelectedProjectIds = (this.projects() || []).map((p) => p.id);
    const contract: SelectProjectsDialogContract = {
      title: 'Select projects',
      // eslint-disable-next-line max-len
      description: `Assigning technology, '${this.technology()?.name}', to selected projects`,
      initialSelectedProjectIds,
    };
    const dialogRef = this.dialog.open(
      SelectProjectsDialogComponent,
      {
        id: 'select-projects-to-assign-technology',
        data: contract,
      },
    );

    dialogRef.afterClosed().pipe(first()).forEach(
      async (closeContract: SelectProjectsDialogCloseContract) => {
        const technologyId = this.technology()?.id;
        if (!closeContract || !technologyId) return;

        const initialSelected = initialSelectedProjectIds;
        const selected = closeContract.selectedProjectIds;

        const newItems = selected.filter(
          (id) => !initialSelected.includes(id),
        );

        const removedItems = initialSelected.filter(
          (id) => !selected.includes(id),
        );

        await this.projectsService.updateTechnologyProjects(
          technologyId,
          newItems,
          removedItems,
        ).then(() => {
          this.logger.log('Successfully updated technology projects');
        })
          .catch((error: unknown) => {
            this.logger.error('Error updating technology projects', error);
          });
      },
    );
  }
}
