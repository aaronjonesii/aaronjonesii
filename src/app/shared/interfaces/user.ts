import { firebaseTimestamp, TimeStamp } from "./timestamp";

export interface User {
  displayName?: string,
  email?: string,
  phoneNumber?: string,
  photoURL?: string,
  joined?: firebaseTimestamp,
  admin?: boolean,
  id?: string,
}

export interface readUser extends User {
  joined?: TimeStamp
}
