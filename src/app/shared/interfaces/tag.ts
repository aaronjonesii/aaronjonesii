import { firebaseTimestamp } from './timestamp';

export interface Tag {
  id?: string;
  name?: string;
  description?: string;
  slug: string;
  created?: firebaseTimestamp;
  updated?: firebaseTimestamp;
  featured: boolean;
  projects: string[] | null;
}
