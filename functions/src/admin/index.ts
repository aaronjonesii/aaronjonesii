import * as functions from "firebase-functions";
import * as logs from "./logs";

let is_updateClaims_initialized = false;
let is_updateUser_initialized = false;

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

exports.updateUser = functions.runWith({enforceAppCheck: true})
  .https.onCall(async (data: {user?: string}, context) => {
    // context.app will be undefined if the request doesn't include an
    // App Check token. (If the request includes an invalid App Check
    // token, the request will be rejected with HTTP error 401.)
    if (context.app == undefined) {
      const errorMessage = 'The function must be called from an App Check verified app.';
      throw new functions.https.HttpsError('failed-precondition', errorMessage, errorMessage);
    }

    /* check if admin */
    if (!context.auth?.token.admin) {
      throw new functions.https.HttpsError(
        'permission-denied',
        'The function must be called as an admin.'
      );
    }

    /* check if user uid was provided */
    const userUID = data.user;
    if (!userUID) {
      const errorMessage = `The function must be called with a user.`;
      throw new functions.https.HttpsError(`invalid-argument`, errorMessage, errorMessage);
    }

    /* Initialize Admin SDK */
    const admin = await import('firebase-admin');
    if (!is_updateUser_initialized) {
      admin.initializeApp();
      is_updateUser_initialized = true;
    }

    try {
      const userRecord = await admin.auth().getUser(userUID);
      const userRef = await admin.firestore().collection(`users`).doc(userUID);
      const userSnap = await userRef.get();

      if (!userSnap.exists) {
        const errorMessage = `Something went wrong getting user from database`;
        throw new functions.https.HttpsError(`not-found`, errorMessage, errorMessage);
      }

      const userDocument = userSnap.data();
      const creationTime = new Date(userRecord.metadata.creationTime);
      const joinedSeconds = Math.floor(creationTime.getTime() / 1000);
      const joinedNanoseconds = (creationTime.getTime() % 1000) * 1000000;
      const joinedTimestamp = new admin.firestore.Timestamp(joinedSeconds, joinedNanoseconds);
      return userRef.update({
        displayName: userDocument?.displayName ?? userRecord.displayName ?? null,
        phoneNumber: userDocument?.phoneNumber ?? userRecord.phoneNumber ?? null,
        photoURL: userDocument?.photoURL ?? userRecord.photoURL ?? null,
        email: userRecord.email ?? null,
        admin: userRecord.customClaims?.admin,
        joined: joinedTimestamp,
      }).then(() => ({ success: true, message: `Successfully updated user` }))
        .catch(error => { throw new functions.https.HttpsError(`unknown`, ``, error); });
    } catch (error) {
      const errorMessage = (error as Error).message ?? `Something went wrong updating user.`
      throw new functions.https.HttpsError(`unknown`, errorMessage, error);
    }
  });
