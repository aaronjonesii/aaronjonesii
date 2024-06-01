import { firebaseTimestamp } from './timestamp';

export interface ContactRequest {
  id?: string;
  name: string;
  company: string;
  email: string;
  message: string;
  created?: firebaseTimestamp;
  updated?: firebaseTimestamp;
}
