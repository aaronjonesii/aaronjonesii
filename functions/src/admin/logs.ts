import { logger } from "firebase-functions";

export const noRequestor = (uid?: string): void => {
  logger.log(`No authenticated user detected: '${uid}'`);
};

export const noRequestee = (uid?: string): void => {
  logger.log(`No user provided: '${uid}'`);
};

export const notAdmin = (uid?: string): void => {
  logger.log(`Requesting user is not a admin: '${uid}'`);
};

export const updatingClaims = (requestor: string, requestee: string, claims: {[key:string]: string|boolean}): void => {
  logger.log(`Admin, ${requestor}, updating users', '${requestee}', custom claims to: [${JSON.stringify(claims)}]`);
};

export const updatedClaims = (requestor: string, requestee: string) => {
  logger.log(`Admin, ${requestor}, successfully updated users', ${requestee}, custom claims`);
};

export const errorUpdatingUserClaims = (uid: string, error: Error) => {
  logger.error(`Error updating users', ${uid},custom claims: `, error.message);
};

export const firestoreDocCreated = (collection: string, docID: string): void => {
  logger.log(`[🔥📄] Added doc '${docID}' to collection '${collection}' in Firestore.`);
};

export const firestoreDocUpdated = (collection: string, docID: string): void => {
  logger.log(`[🔥📄] Updated doc '${docID}' from collection '${collection}' in Firestore.`);
};

export const firestoreDocDeleted = (collection: string, docID: string): void => {
  logger.log(`[🗑️🔥📄] Deleted doc '${docID}' from collection '${collection}' in Firestore.`);
};
