import { Component, inject, OnInit, signal } from '@angular/core';
import {
  TopAppBarService,
} from '../../../../../shared/components/top-app-bar/top-app-bar.service';
import { MatButton } from '@angular/material/button';
import {
  SelectImageComponent,
} from '../../../../../shared/components/select-image/select-image.component';
import { TechnologyForm } from '../../../../../shared/forms/technology.form';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Location } from '@angular/common';
import {
  TechnologiesService,
} from '../../../../../shared/services/technologies.service';
import {
  ConsoleLoggerService,
} from '../../../../../shared/services/console-logger.service';
import { Router } from '@angular/router';
import { navPath } from '../../../../../app.routes';

@Component({
  selector: 'aj-create-technology',
  templateUrl: './create-technology.component.html',
  styleUrl: './create-technology.component.scss',
  standalone: true,
  imports: [
    MatButton,
    SelectImageComponent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
  ],
})
export class CreateTechnologyComponent implements OnInit {
  private topAppBarService = inject(TopAppBarService);
  private location = inject(Location);
  private technologiesService = inject(TechnologiesService);
  private logger = inject(ConsoleLoggerService);
  private router = inject(Router);

  protected readonly title = 'Create Technology';
  createTechnologyForm = new TechnologyForm();

  loading = signal(false);

  ngOnInit() {
    this.topAppBarService.setOptions({
      title: `Admin ${this.title}`,
      loading: false,
      showBackBtn: true,
    });
  }

  async onCreateBtnClick() {
    if (this.createTechnologyForm.formGroup.invalid) return;

    this.loading.set(true);

    const createdTechnology = await this.technologiesService.createTechnology(
      this.createTechnologyForm.technology,
    );

    if (createdTechnology) {
      this.logger.info('Technology created');
      await this.router.navigate([navPath.adminTechnologies]);
    }

    this.loading.set(false);
  }

  onCancelBtnClick() {
    this.location.back();
  }
}
