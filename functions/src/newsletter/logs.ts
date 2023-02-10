import { logger } from "firebase-functions";

export const error = (...args: any[]) => {
  logger.error(...args);
};

export const alreadySubscribed = (email: string) => {
  logger.log(`Email is already subscribed: '${email}'`);
};

export const firestoreDocCreated = (collection: string, docID: string): void => {
  logger.log(`[🔥📄] Added doc '${docID}' to collection '${collection}' in Firestore.`);
};
