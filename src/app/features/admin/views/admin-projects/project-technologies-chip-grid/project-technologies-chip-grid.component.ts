import {
  Component,
  computed, effect,
  input,
  OnDestroy,
  signal,
  viewChild,
} from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import {
  MatChipAvatar,
  MatChipGrid,
  MatChipInput,
  MatChipInputEvent, MatChipRemove, MatChipRow,
} from '@angular/material/chips';
import { COMMA, ENTER, PERIOD } from '@angular/cdk/keycodes';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent, MatAutocompleteTrigger, MatOption,
} from '@angular/material/autocomplete';
import { Technology } from '../../../../../shared/interfaces/technology';
import { FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgOptimizedImage } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'aj-project-technologies-chip-grid',
  templateUrl: './project-technologies-chip-grid.component.html',
  styleUrl: './project-technologies-chip-grid.component.scss',
  standalone: true,
  imports: [
    MatFormField,
    MatChipGrid,
    MatChipInput,
    MatAutocomplete,
    MatLabel,
    ReactiveFormsModule,
    MatChipRemove,
    MatChipRow,
    MatIcon,
    MatOption,
    MatAutocompleteTrigger,
    NgOptimizedImage,
    MatChipAvatar,
  ],
})
export class ProjectTechnologiesChipGridComponent implements OnDestroy {
  selectedTechnologiesFormArray =
    input(new FormArray<FormControl<Technology>>([]));

  separatorKeyCodes = input<number[]>([ENTER, COMMA, PERIOD]);

  allTechnologies = input<Technology[]>([]);

  technologyCtrl = new FormControl();

  technologyInput = viewChild<HTMLInputElement>('technologyInput');

  inputValue = toSignal(this.technologyCtrl.valueChanges);

  selectedTechnologies = signal<Technology[]>([]);

  filteredTechnologies = computed(() => {
    const inputValue = this.inputValue();
    const selectedTechnologies = this.selectedTechnologies();
    const filteredTechnologies = inputValue ?
      this._filter(inputValue) : this.allTechnologies();

    return filteredTechnologies.filter((technology) => {
      return !selectedTechnologies.some((t) => t?.id === technology?.id);
    });
  });

  selectedTechnologiesEffect = effect(() => {
    const valueChanges = this.selectedTechnologiesFormArray().valueChanges;
    this.subscriptions.add(
      valueChanges.subscribe((selectedTechnologies) => {
        this.selectedTechnologies.set(selectedTechnologies);
      }),
    );
  });

  private subscriptions = new Subscription();

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onAdd(event: MatChipInputEvent) {
    const value = (event.value || '').trim();
    if (!value) return;

    /* skip if already selected */
    const isAlreadySelected = this.selectedTechnologiesFormArray()
      .value.some((t) => t.name === value);
    if (isAlreadySelected) return;

    /* add technology */
    if (value) {
      this.selectedTechnologiesFormArray().push(
        new FormControl<Technology>(
          {
            value: { name: value },
            disabled: false,
          },
          { nonNullable: true },
        ),
      );
    }

    /* clear input value */
    event.chipInput.clear();

    this.technologyCtrl.setValue(null);
  }

  onSelect(event: MatAutocompleteSelectedEvent) {
    this.selectedTechnologiesFormArray().push(
      new FormControl<Technology>(
        <Technology>event.option.value,
        { nonNullable: true },
      ),
    );
    const technologyInput = this.technologyInput();
    if (technologyInput) technologyInput.value ='';
    this.technologyCtrl.setValue(null);
  }

  onRemove(index: number) {
    this.selectedTechnologiesFormArray().removeAt(index);
  }

  private _filter(inputValue: string) {
    return this.allTechnologies().filter((t) => t.name.includes(inputValue));
  }
}
