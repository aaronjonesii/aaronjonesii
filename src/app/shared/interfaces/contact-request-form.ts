import { FormControl } from '@angular/forms';

export interface ContactRequestFormGroup {
  name: FormControl<string>;
  company: FormControl<string>;
  email: FormControl<string>;
  message: FormControl<string>;
}
