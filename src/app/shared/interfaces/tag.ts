import { firebaseTimestamp } from './timestamp';
import { FieldValue } from '@angular/fire/firestore/firebase';

export interface Tag {
  id?: string;
  name?: string;
  description?: string;
  slug: string;
  created?: firebaseTimestamp;
  updated?: firebaseTimestamp;
  featured: boolean;
  projects: FieldValue | string[] | null;
}
