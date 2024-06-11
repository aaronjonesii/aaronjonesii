import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  input,
  Input,
  ViewChild,
} from '@angular/core';
import { FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe } from '@angular/common';
import { Tag } from '../../../../../shared/interfaces/tag';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'aj-project-tags',
  templateUrl: './project-tags.component.html',
  styleUrl: './project-tags.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatFormFieldModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
})
export class ProjectTagsComponent {
  @Input() selectedTagsFormArray = new FormArray<FormControl<string>>([]);
  allTags = input<Tag[] | null | undefined>(null);
  tags = computed(() => {
    return this.allTags()?.map((t) => t.slug) || [];
  });
  readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];
  tagCtrl = new FormControl('');
  @ViewChild('tagInput') tagInput?: ElementRef<HTMLInputElement>;
  inputValue = toSignal(this.tagCtrl.valueChanges);
  filteredTags = computed(() => {
    const inputValue = this.inputValue();
    const filteredTags = inputValue ? this._filter(inputValue) : this.tags();
    return filteredTags.filter((tag) => {
      return !this.selectedTagsFormArray.value?.includes(tag);
    });
  });

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (!value) return;

    // Skip if requested tag is already in selected tags
    if (this.selectedTagsFormArray.value.some((tag) => tag === value)) return;

    // Add our tag
    if (value) {
      this.selectedTagsFormArray.push(
        new FormControl<string>(value, { nonNullable: true }),
      );
    }

    // Clear the input value
    event.chipInput?.clear();

    this.tagCtrl.setValue(null);
  }

  remove(tag: string): void {
    const index = this.selectedTagsFormArray.value.indexOf(tag);

    if (index >= 0) this.selectedTagsFormArray.removeAt(index);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedTagsFormArray.push(
      new FormControl<string>(event.option.viewValue, { nonNullable: true }),
    );
    (<ElementRef<HTMLInputElement>> this.tagInput).nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(inputValue: string): string[] {
    const filterValue = inputValue.toLowerCase();

    return this.tags().filter((tag) => tag.toLowerCase().includes(filterValue));
  }
}
