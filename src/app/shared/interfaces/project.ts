import { firebaseTimestamp, TimeStamp } from './timestamp';
import { FieldValue } from '@angular/fire/firestore/firebase';
import { DocumentReference } from '@angular/fire/firestore';
import { Technology } from './technology';

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
  technologies?: (Technology | DocumentReference<Technology>)[] | FieldValue,
  developmentStatus: ProjectDevelopmentStatus | null,
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

export enum ProjectDevelopmentStatus {
  NOT_STARTED = 'Not Started',
  PLANNED = 'Planned',
  IN_DEVELOPMENT = 'In Development',
  COMPLETE = 'Complete',
  ON_HOLD = 'On Hold',
  CANCELLED = 'Cancelled',
}
/* eslint-enable no-unused-vars */

export interface WriteProject extends Project {
  created: FieldValue,
  updated: FieldValue | null,
  technologies?: FieldValue | DocumentReference<Technology>[],
}

export interface ReadProject extends Project {
  created: TimeStamp,
  updated: TimeStamp | null,
  technologies?: DocumentReference<Technology, Technology>[],
}

export interface ProjectWithID extends ReadProject { id: string; }

export interface ProjectWithTech extends Project {
  id: string,
  created: TimeStamp,
  updated: TimeStamp | null,
  technologies: Technology[],
}

export interface ProjectStats {
  characters: number,
  words: number,
}
