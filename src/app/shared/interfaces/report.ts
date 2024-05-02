import { firebaseTimestamp, TimeStamp } from './timestamp';
import { DocumentReference } from '@angular/fire/firestore';
import { FieldValue } from '@angular/fire/firestore/firebase';

export interface Report {
  id?: string;
  created: firebaseTimestamp;
  updated?: firebaseTimestamp;
  by: DocumentReference;
  reason: ReportReason;
  document: DocumentReference;
}
export interface WriteReport extends Report {
  created: FieldValue;
  updated?: FieldValue;
}
export interface ReadReport extends Report {
  created: TimeStamp;
  updated?: TimeStamp;
}
export interface ReportWithID extends ReadReport {
  id: string;
}
/* eslint-disable no-unused-vars */
export enum ReportReason {
  BULLYING_HARASSMENT = 'Bullying & Harassment',
  NUDITY_SEXUAL_CONTENT = 'Nudity & Sexual Content',
  // eslint-disable-next-line max-len
  THREATS_VIOLENCE_DANGEROUS_BEHAVIOR = 'Threats, Violence & Dangerous Behavior',
  // eslint-disable-next-line max-len
  HATE_SPEECH_TERRORISM_VIOLENT_EXTREMISM = 'Hate Speech, Terrorism, & Violent Extremism',
  DRUGS_WEAPONS = 'Drugs & Weapons',
  SUICIDE_SELF_HARM = 'Suicide & Self-Harm',
  FALSE_INFORMATION = 'False Information',
  INTELLECTUAL_PROPERTY = 'Intellectual Property',
  TEST_REASON = 'Test Report Reason',
}
/* eslint-enable no-unused-vars */
