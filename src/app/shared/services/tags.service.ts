import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TagsService {
  /**
   * Calculates which tags have been removed between two arrays of tags.
   *
   * @param {string[]} previousTags - The original array of tags.
   * @param {string[]} currentTags - The updated array of tags.
   * @return {string[]} An array containing tags present in 'previousTags'
   * but absent in 'currentTags'.
   */
  removedTags(previousTags: string[], currentTags: string[]): string[] {
    return previousTags.filter((oldTag) => !currentTags.includes(oldTag));
  }

  /**
   * Calculates which tags have been newly added between two arrays of tags.
   *
   * @param {string[]} previousTags - The original array of tags.
   * @param {string[]} currentTags - The updated array of tags.
   * @return {string[]} An array containing tags present in 'currentTags'
   * but absent in 'previousTags'.
   */
  addedTags(previousTags: string[], currentTags: string[]): string[] {
    return currentTags.filter((newTag) => !previousTags.includes(newTag));
  }
}
