import { DocumentReference } from '@angular/fire/firestore';
import { firebaseTimestamp, TimeStamp } from './timestamp';
import { FieldValue } from '@angular/fire/firestore/firebase';

export interface Comment {
  id?: string;
  parent: DocumentReference;
  user: DocumentReference;
  content: string;
  created: firebaseTimestamp;
  updated?: firebaseTimestamp;
  likes?: DocumentReference[];
  dislikes?: DocumentReference[];
  author: { name?: string, image?: string };
}
export interface WriteComment extends Comment {
  created: FieldValue;
  updated?: FieldValue;
}
export interface ReadComment extends Comment {
  created: TimeStamp;
  updated?: TimeStamp;
}
export interface CommentWithID extends ReadComment {
  id: string;
}
