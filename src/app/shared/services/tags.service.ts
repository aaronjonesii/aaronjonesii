import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TagsService {

  public removedTags(previousTags: string[], currentTags: string[]): string[] {
    return previousTags.filter(oldTag => !currentTags.includes(oldTag));
  }
  public addedTags(previousTags: string[], currentTags: string[]): string[] {
    return currentTags.filter(newTag => !previousTags.includes(newTag));
  }
}
