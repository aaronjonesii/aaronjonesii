import { FormControl, FormGroup, Validators } from "@angular/forms";

export interface ContactForm {
  name: FormControl<string>;
  company: FormControl<string>;
  email: FormControl<string>;
  message: FormControl<string>;
}

export const initialContactForm = new FormGroup<ContactForm>({
  name: new FormControl<string>('', {nonNullable: true, validators: Validators.required}),
  company: new FormControl<string>('', {nonNullable: true}),
  email: new FormControl<string>('', {nonNullable: true, validators: [Validators.required, Validators.email]}),
  message: new FormControl<string>('', {nonNullable: true, validators: Validators.required})
});
