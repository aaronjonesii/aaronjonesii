import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TagsService {
  removedTags(previousTags: string[], currentTags: string[]): string[] {
    return previousTags.filter(oldTag => !currentTags.includes(oldTag));
  }

  addedTags(previousTags: string[], currentTags: string[]): string[] {
    return currentTags.filter(newTag => !previousTags.includes(newTag));
  }
}
