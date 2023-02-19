import * as functions from "firebase-functions";
import * as logs from "./logs";

let is_updateClaims_initialized = false;

/* Update user custom claims */
exports.updateClaims = functions.https.onCall(
  async (data, context) => {
    const admin = await import('firebase-admin');
    if (!is_updateClaims_initialized) {
      admin.initializeApp();
      is_updateClaims_initialized = true;
    }

    /* perform operation on provided user */
    const requestor = context.auth?.uid;
    if (!requestor) {
      logs.noRequestor(requestor);
      throw new functions.https.HttpsError(
        'unauthenticated',
        'The function must be called while authenticated.'
      );
    }
    if (!context.auth?.token.admin) {
      logs.notAdmin(requestor);
      throw new functions.https.HttpsError(
        'permission-denied',
        'The function must be called as an admin.'
      );
    }
    const requestee = data.user;
    if (!requestee) {
      logs.noRequestee(requestee);
      throw new functions.https.HttpsError(
        'permission-denied',
        'The function must be called for a user.'
      );
    }

    const customUserClaim = {admin: data.admin ?? false};
    try {
      logs.updatingClaims(requestor, requestee, customUserClaim);
      await admin.auth().setCustomUserClaims(requestee, customUserClaim)
        .then(async () => {
          logs.updatedClaims(requestor, requestee);

          await admin.firestore().doc(`users/${requestee}`).set(customUserClaim, {merge: true})
            .then(() => {
              logs.firestoreDocUpdated(`users`, requestee);
              return {
                ok: true,
                status: 200,
                statusText: 'OK',
                message: `Successfully updated and saved the users', '${requestee}', custom claims.`
              };
            });
        }).catch((error: Error) => {
          logs.errorUpdatingUserClaims(requestee, error);
          throw new functions.https.HttpsError('unknown', error.message);
        });
    } catch (error: any) {
      logs.errorUpdatingUserClaims(requestee, error);
      throw new functions.https.HttpsError('internal', error.message);
    }

  });
