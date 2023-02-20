import { firebaseTimestamp, TimeStamp } from "./timestamp";

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
}
export interface readUser extends User {
  joined?: TimeStamp
}
export interface UserWithID extends readUser {
  id: string,
}
