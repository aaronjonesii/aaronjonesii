import { logger } from "firebase-functions";

export const savingUser = (userUID: string) => {
  logger.log(`Saving user in DB: ${userUID}`);
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

export const errorSavingUser = (error: Error) => {
  logger.error(`Error saving user in Firebase Firestore: `, error.message);
};

export const errorUpdatingUser = (error: Error) => {
  logger.error(`Error updating user in Firebase Authentication: `, error.message);
};

export const updatedUser = (uid: string) => {
  logger.log(`Successfully updated user: ${uid}`);
};

export const updatingUserComments = (num: number) => {
  logger.log(`Updating ${num} ${num === 1 ? 'comment' : 'comments'}`);
};

export const updatingUserProjects = (num: number) => {
  logger.log(`Updating ${num} ${num === 1 ? 'project' : 'projects'}`);
};
