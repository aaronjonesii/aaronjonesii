import { firebaseTimestamp, TimeStamp } from "./timestamp";
import { DocumentReference } from "@angular/fire/firestore";

export interface User {
  displayName?: string,
  email: string,
  phoneNumber?: string,
  photoURL?: string,
  joined?: firebaseTimestamp,
  admin?: boolean,
  id?: string,
  following?: boolean,
  updated?: firebaseTimestamp,
  reported?: DocumentReference[],
}
export interface readUser extends User {
  joined?: TimeStamp,
}
export interface UserWithID extends readUser {
  id: string,
}
