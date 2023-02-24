import { FormControl } from "@angular/forms";

export interface ProfileForm {
  displayName:  FormControl<string | null>;
  email: FormControl<string>;
  photoURL: FormControl<string | null>;
}
