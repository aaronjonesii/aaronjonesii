import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactRequestFormGroup } from '../interfaces/contact-request-form';

export class ContactRequestForm {
  formGroup = new FormGroup<ContactRequestFormGroup>({
    name: new FormControl<string>(
      '',
      { nonNullable: true, validators: Validators.required },
    ),
    company: new FormControl<string>('', { nonNullable: true }),
    email: new FormControl<string>(
      '',
      {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      },
    ),
    message: new FormControl<string>(
      '',
      { nonNullable: true, validators: Validators.required },
    ),
  });

  get nameCtrl() {
    return this.formGroup.controls.name;
  }
  get name() {
    return this.nameCtrl.value;
  }

  get companyCtrl() {
    return this.formGroup.controls.company;
  }
  get company() {
    return this.companyCtrl.value;
  }

  get emailCtrl() {
    return this.formGroup.controls.email;
  }
  get email() {
    return this.emailCtrl.value;
  }

  get messageCtrl() {
    return this.formGroup.controls.message;
  }
  get message() {
    return this.messageCtrl.value;
  }

  get invalid() {
    return this.formGroup.invalid;
  }
}
