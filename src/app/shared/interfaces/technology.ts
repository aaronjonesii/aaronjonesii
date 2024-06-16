import { DocumentReference, FieldValue } from '@angular/fire/firestore';
import { Project } from './project';

export interface Technology {
  id?: string | null,
  name: string,
  description?: string | null,
  logoImage?: string | null,
  projects?: DocumentReference<Project>[] | FieldValue,
}

