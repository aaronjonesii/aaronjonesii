import { FieldValue } from '@angular/fire/firestore/firebase';

export interface TimeStamp {
  seconds: number;
  nanoseconds: number;
}

export type firebaseTimestamp = TimeStamp | FieldValue;
