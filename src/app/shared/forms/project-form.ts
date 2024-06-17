import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  ProjectDevelopmentStatus,
  ProjectStatus,
  ProjectVisibility,
} from '../interfaces/project';
import { Technology } from '../interfaces/technology';

export interface ProjectForm {
  name: FormControl<string>,
  description: FormControl<string>,
  slug: FormControl<string>,
  content: FormControl<string | null>,
  image: FormControl<string | null>,
  tags: FormArray<FormControl<string>>,
  livePreviewLink: FormControl<string | null>,
  sourceCodeLink: FormControl<string | null>,
  status: FormControl<ProjectStatus>,
  visibility: FormControl<ProjectVisibility>,
  featured: FormControl<boolean>,
  allowComments: FormControl<boolean>
  technologies: FormArray<FormControl<Technology>>,
  developmentStatus: FormControl<ProjectDevelopmentStatus | null>,
}

export const initialProjectForm = new FormGroup<ProjectForm>({
  name: new FormControl<string>(
    '',
    { nonNullable: true, validators: Validators.required },
  ),
  description: new FormControl<string>(
    '',
    { nonNullable: true, validators: Validators.required },
  ),
  slug: new FormControl<string>(
    '',
    { nonNullable: true, validators: Validators.required },
  ),
  content: new FormControl<string | null>(null),
  image: new FormControl<string | null>(null),
  tags: new FormArray<FormControl<string>>([]),
  livePreviewLink: new FormControl<string | null>(null),
  sourceCodeLink: new FormControl<string | null>(null),
  status: new FormControl<ProjectStatus>(
    ProjectStatus.DRAFT,
    { nonNullable: true, validators: Validators.required },
  ),
  visibility: new FormControl<ProjectVisibility>(
    ProjectVisibility.PUBLIC,
    { nonNullable: true, validators: Validators.required },
  ),
  featured: new FormControl<boolean>(
    false,
    { nonNullable: true, validators: Validators.required },
  ),
  allowComments: new FormControl<boolean>(
    true,
    { nonNullable: true, validators: Validators.required },
  ),
  technologies: new FormArray<FormControl<Technology>>([]),
  developmentStatus: new FormControl(null),
});
