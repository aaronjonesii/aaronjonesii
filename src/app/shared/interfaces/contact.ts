import { firebaseTimestamp } from "./timestamp";
import { FieldValue } from "@angular/fire/firestore/firebase";

export interface Contact {
  id?: string;
  name: string;
  company: string;
  email: string;
  message: string;
  created?: firebaseTimestamp;
  updated?: firebaseTimestamp;
}
export interface writeContact extends Contact {
  created?: FieldValue;
  joined?: FieldValue;
}
