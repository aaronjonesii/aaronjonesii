import { firebaseTimestamp, TimeStamp } from './timestamp';
import { FieldValue } from '@angular/fire/firestore/firebase';

export interface Project {
  id?: string,
  name: string,
  description: string,
  slug: string,
  content: string | null,
  image: string | null,
  tags: string[] | null,
  livePreviewLink: string | null,
  sourceCodeLink: string | null,
  status: ProjectStatus,
  visibility: ProjectVisibility,
  created: firebaseTimestamp,
  updated: firebaseTimestamp | null,
  featured: boolean,
  allowComments: boolean,
  roles: { [key: string]: 'owner' | 'writer' | 'reader' | 'commenter' },
  shards: number,
  views?: number, // sharded distributed counter
  author: { name: string, image: string | null },
}
/* eslint-disable no-unused-vars */
export enum ProjectStatus {
  DRAFT = 'draft',
  ARCHIVED = 'archived',
  PUBLISHED = 'published',
}

export enum ProjectVisibility {
  PUBLIC = 'public',
  PRIVATE = 'private',
}
/* eslint-enable no-unused-vars */

export interface ProjectWithID extends Project { id: string; }
export interface WriteProject extends Project {
  created: FieldValue,
  updated: FieldValue | null,
}
export interface ReadProject extends Project {
  created: TimeStamp,
  updated: TimeStamp | null,
}
