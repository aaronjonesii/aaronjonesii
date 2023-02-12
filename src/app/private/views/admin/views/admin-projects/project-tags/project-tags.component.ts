import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormArray, FormControl } from "@angular/forms";
import { COMMA, ENTER, SPACE } from "@angular/cdk/keycodes";
import { catchError, Observable, startWith, throwError } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { MatChipInputEvent } from "@angular/material/chips";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { FirestoreService } from "../../../../../../shared/services/firestore.service";
import { Tag } from "../../../../../../shared/interfaces/tag";
import { ConsoleLoggerService } from "../../../../../../core/services/console-logger.service";

@Component({
  selector: 'aj-project-tags',
  templateUrl: './project-tags.component.html',
  styleUrls: ['./project-tags.component.scss']
})
export class ProjectTagsComponent {
  @Input('tagsFormArray') selectedTagsFormArray = new FormArray<FormControl<string>>([]);
  public readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];
  public tagCtrl = new FormControl('');
  public filteredTags$: Observable<string[]>;
  private allTags$: Observable<string[]>;
  @ViewChild('tagInput') tagInput?: ElementRef<HTMLInputElement>;

  constructor(
    private db: FirestoreService,
    private cLog: ConsoleLoggerService
  ) {
    this.allTags$ = (db.col$(`tags`) as Observable<Tag[]>)
      .pipe(
        map(tags => tags.map(tag => tag.slug)),
        catchError(error => {
        this.cLog.error(`Something went wrong loading tags`, error);
        return throwError(error);
      })
      );
    this.filteredTags$ = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      switchMap((inputValue: string | null) => (
        inputValue ?
          this._filter(inputValue).pipe(map(this.filterSelectedTags)) :
          this.allTags$.pipe(map(this.filterSelectedTags))
      ))
    );
  }
  private filterSelectedTags = (tags: string[]) => tags.filter(tag => !this.selectedTagsFormArray.value?.includes(tag));

  public add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (!value) return;

    // Skip if requested tag is already in selected tags
    if (this.selectedTagsFormArray.value.some(tag => { return tag === value })) return;

    // Add our tag
    if (value) this.selectedTagsFormArray.push(new FormControl<string>(value, {nonNullable: true}));

    // Clear the input value
    event.chipInput!.clear();

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

    return this.allTags$.pipe(map(tags => tags.filter(tag => tag.toLowerCase().includes(filterValue))));
  }
}
