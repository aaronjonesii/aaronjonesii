import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl } from "@angular/forms";
import { COMMA, ENTER, SPACE } from "@angular/cdk/keycodes";
import { Observable, of, startWith } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { MatChipInputEvent } from "@angular/material/chips";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { Tag } from "../../../../../../shared/interfaces/tag";

@Component({
  selector: 'aj-project-tags',
  templateUrl: './project-tags.component.html',
  styleUrls: ['./project-tags.component.scss']
})
export class ProjectTagsComponent implements OnInit {
  @Input() selectedTagsFormArray = new FormArray<FormControl<string>>([]);
  @Input() allTags$: Observable<Tag[]> = of([]);
  public tags$: Observable<string[]> = of([]);
  public readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];
  public tagCtrl = new FormControl('');
  public filteredTags$: Observable<string[]>;
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
  ngOnInit() { this.tags$ = this.allTags$.pipe(map(tags => tags.map(tag => tag.slug))); }

  private filterSelectedTags = (tags: string[]) => tags.filter(tag => !this.selectedTagsFormArray.value?.includes(tag));

  public add(event: MatChipInputEvent): void {
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

  public remove(tag: string): void {
    const index = this.selectedTagsFormArray.value.indexOf(tag);

    if (index >= 0) this.selectedTagsFormArray.removeAt(index);
  }

  public selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedTagsFormArray.push(new FormControl<string>(event.option.viewValue, {nonNullable: true}));
    (<ElementRef<HTMLInputElement>>this.tagInput).nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(inputValue: string): Observable<string[]> {
    const filterValue = inputValue.toLowerCase();

    return this.tags$.pipe(map(tags => tags.filter(tag => tag.toLowerCase().includes(filterValue))));
  }
}
