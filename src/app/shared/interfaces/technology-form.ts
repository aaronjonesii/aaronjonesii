import { FormControl } from '@angular/forms';

export interface TechnologyFormGroup {
  id: FormControl<string | null>,
  name: FormControl<string>,
  description: FormControl<string | null>,
  logoImage: FormControl<string | null>,
}
