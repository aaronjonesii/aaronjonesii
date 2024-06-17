import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  effect,
  inject, OnInit, signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs';
import {
  TechnologiesService,
} from '../../../../../shared/services/technologies.service';
import { TechnologyForm } from '../../../../../shared/forms/technology.form';
import { ReactiveFormsModule } from '@angular/forms';
import {
  SelectImageComponent,
} from '../../../../../shared/components/select-image/select-image.component';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { Location } from '@angular/common';
import { navPath } from '../../../../../app.routes';
import {
  ConsoleLoggerService,
} from '../../../../../shared/services/console-logger.service';
import {
  TopAppBarService,
} from '../../../../../shared/components/top-app-bar/top-app-bar.service';

@Component({
  selector: 'aj-edit-technology',
  templateUrl: './edit-technology.component.html',
  styleUrl: './edit-technology.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SelectImageComponent,
    MatFormField,
    MatInput,
    MatButton,
    MatLabel,
  ],
})
export class EditTechnologyComponent implements OnInit {
  private topAppBarService = inject(TopAppBarService);
  private route = inject(ActivatedRoute);
  private technologyService = inject(TechnologiesService);
  private location = inject(Location);
  private router = inject(Router);
  private logger = inject(ConsoleLoggerService);
  private cdRef = inject(ChangeDetectorRef);

  protected readonly title = 'Edit Technology';
  private routeTechnologyId$ = this.route.paramMap.pipe(
    map((paramMap) => paramMap.get('technologyId')),
  );
  private technology$ = this.routeTechnologyId$.pipe(
    switchMap((id) => this.technologyService.getTechnology$(id || '')),
  );
  technology = toSignal(this.technology$);

  loading = signal(false);

  editTechnologyForm = new TechnologyForm();

  private technologyEffect = effect(() => {
    const technology = this.technology();
    this.editTechnologyForm.updateForm(technology ? technology : null);
    this.cdRef.markForCheck();
  });

  ngOnInit() {
    this.topAppBarService.setOptions({
      title: `Admin ${this.title}`,
      loading: false,
      showBackBtn: true,
    });
  }

  async onSaveBtnClick() {
    const technology = this.editTechnologyForm.technology;
    if (this.editTechnologyForm.formGroup.invalid || !technology.id) return;

    this.loading.set(true);

    await this.technologyService.updateTechnology(technology.id, technology)
      .then(() => {
        this.logger.info('Technology updated');
        if (technology.id) {
          this.router.navigate([navPath.adminDetailTechnology(technology.id)]);
        }
      });

    this.loading.set(false);
  }

  onCancelBtnClick() {
    this.location.back();
  }
}
