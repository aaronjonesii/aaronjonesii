import { DocumentReference, FieldValue } from '@angular/fire/firestore';
import { Project } from './project';
import { firebaseTimestamp } from './timestamp';

export interface Technology {
  id?: string | null,
  name: string,
  description?: string | null,
  logoImage?: string | null,
  projects?: DocumentReference<Project>[] | FieldValue,
  created?: firebaseTimestamp,
  updated?: firebaseTimestamp,
}

