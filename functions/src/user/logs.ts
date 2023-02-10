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
  logger.error(`Error saving user to DB: `, error.message)
};
