import { firebaseTimestamp } from './timestamp';
import { FieldValue } from '@angular/fire/firestore/firebase';
import { DocumentData } from '@angular/fire/compat/firestore/interfaces';

export interface Tag extends DocumentData{
  id?: string;
  name?: string;
  description?: string;
  slug: string;
  created?: firebaseTimestamp;
  updated?: firebaseTimestamp;
  featured: boolean;
  projects: FieldValue | string[] | null;
}
