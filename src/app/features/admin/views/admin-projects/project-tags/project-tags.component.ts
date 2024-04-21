import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, ReactiveFormsModule } from "@angular/forms";
import { COMMA, ENTER, SPACE } from "@angular/cdk/keycodes";
import { Observable, of, startWith } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { MatChipInputEvent, MatChipsModule } from "@angular/material/chips";
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { AsyncPipe } from "@angular/common";
import { Tag } from "../../../../../shared/interfaces/tag";

@Component({
  selector: 'aj-project-tags',
  templateUrl: './project-tags.component.html',
  styleUrl: './project-tags.component.scss',
  standalone: true,
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
export class ProjectTagsComponent implements OnInit {
  @Input() selectedTagsFormArray = new FormArray<FormControl<string>>([]);
  @Input() allTags$: Observable<Tag[]> = of([]);
  tags$: Observable<string[]> = of([]);
  readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];
  tagCtrl = new FormControl('');
  filteredTags$: Observable<string[]>;
  @ViewChild('tagInput') tagInput?: ElementRef<HTMLInputElement>;

  constructor() {
    this.filteredTags$ = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      switchMap((inputValue: string | null) => (
        inputValue ?
          this._filter(inputValue).pipe(map(this.filterSelectedTags)) :
          this.tags$.pipe(map(this.filterSelectedTags))
      ))
    );
  }

  ngOnInit() {
    this.tags$ = this.allTags$.pipe(
      map(tags => tags.map(tag => tag.slug)),
    );
  }

  private filterSelectedTags = (tags: string[]) => tags.filter(tag => {
    return !this.selectedTagsFormArray.value?.includes(tag);
  });

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (!value) return;

    // Skip if requested tag is already in selected tags
    if (this.selectedTagsFormArray.value.some(tag => { return tag === value })) return;

    // Add our tag
    if (value) this.selectedTagsFormArray.push(new FormControl<string>(value, {nonNullable: true}));

    // Clear the input value
    event.chipInput?.clear();

    this.tagCtrl.setValue(null);
  }

  remove(tag: string): void {
    const index = this.selectedTagsFormArray.value.indexOf(tag);

    if (index >= 0) this.selectedTagsFormArray.removeAt(index);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedTagsFormArray.push(new FormControl<string>(event.option.viewValue, {nonNullable: true}));
    (<ElementRef<HTMLInputElement>>this.tagInput).nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(inputValue: string): Observable<string[]> {
    const filterValue = inputValue.toLowerCase();

    return this.tags$.pipe(
      map(tags => tags.filter(tag => tag.toLowerCase().includes(filterValue))),
    );
  }
}
