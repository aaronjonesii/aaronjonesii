import * as functions from "firebase-functions";
import * as logs from "./logs";

let is_subscribe_initialized = false;

exports.subscribe = functions.https.onCall(async (data: {email: string | undefined}) => {
  /* Check if email was provided */
  const email = data.email;
  if (!email) {
    const errorMessage = 'The function must be called with a valid email address.';
    throw new functions.https.HttpsError(
      'invalid-argument',
      errorMessage,
      errorMessage
    );
  }

  /* Initialize Admin SDK */
  const admin = await import('firebase-admin');
  if (!is_subscribe_initialized) {
    admin.initializeApp();
    is_subscribe_initialized = true;
  }

  /* Check if email is already subscribed */
  const docSnap = await admin.firestore().collection('subscribers').doc(email).get();
  if (docSnap.exists) {
    const errorMessage = 'Your email is already subscribed.';
    logs.alreadySubscribed(email);
    throw new functions.https.HttpsError('already-exists', errorMessage, errorMessage);
  }

  /* Add email to subscribers collection */
  await docSnap.ref.create({created: admin.firestore.FieldValue.serverTimestamp()})
    .then((writeResult) => {
      logs.firestoreDocCreated('subscribers', email);
      return {...writeResult, success: true};
    }).catch(error => {
      const errorMessage = 'Unexpected error occurred while trying to subscribe.';
      logs.error(errorMessage, error);
      throw new functions.https.HttpsError('unknown', errorMessage, errorMessage);
    });
});