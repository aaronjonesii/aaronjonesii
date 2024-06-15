import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Technology } from '../interfaces/technology';
import { TechnologyFormGroup } from '../interfaces/technology-form';

export class TechnologyForm {
  formGroup: FormGroup<TechnologyFormGroup>;

  constructor(technology?: Technology) {
    this.formGroup = this._buildForm(technology);
  }

  get idCtrl() {
    return this.formGroup.controls.id;
  }
  get id() {
    return this.formGroup.controls.id.value;
  }

  get nameCtrl() {
    return this.formGroup.controls.name;
  }
  get name() {
    return this.formGroup.controls.name.value;
  }

  get descriptionCtrl() {
    return this.formGroup.controls.description;
  }
  get description() {
    return this.formGroup.controls.description.value;
  }

  get logoImageCtrl() {
    return this.formGroup.controls.logoImage;
  }
  get logoImage() {
    return this.formGroup.controls.logoImage.value;
  }

  get technology(): Technology {
    return {
      id: this.id || null,
      name: this.name,
      description: this.description || null,
      logoImage: this.logoImage || null,
    };
  }

  private _buildForm(technology?: Technology) {
    return new FormGroup<TechnologyFormGroup>({
      id: new FormControl(technology?.id || null),
      name: new FormControl(
        technology?.name || '',
        { validators: Validators.required, nonNullable: true },
      ),
      description: new FormControl(technology?.description || null),
      logoImage: new FormControl(technology?.logoImage || null),
    });
  }
}
