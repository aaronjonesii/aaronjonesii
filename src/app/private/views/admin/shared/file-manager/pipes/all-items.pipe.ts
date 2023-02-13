import { Pipe, PipeTransform } from '@angular/core';
import { ListResult, StorageReference } from '@angular/fire/storage';

@Pipe({name: 'allItems'})
export class AllItemsPipe implements PipeTransform {

  transform(items: ListResult): StorageReference[] {
    return [...items.prefixes, ...items.items];
  }

}
