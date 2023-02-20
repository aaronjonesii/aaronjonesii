import * as functions from "firebase-functions";
import * as logs from "./logs";
import { AppCheckData } from "firebase-functions/lib/common/providers/https";

let is_updateClaims_initialized = false;
let is_updateUser_initialized = false;
let is_createShards_initialized = false;

function assertAppCheck(app?: AppCheckData): asserts app {
  // context.app will be undefined if the request doesn't include an
  // App Check token. (If the request includes an invalid App Check
  // token, the request will be rejected with HTTP error 401.)
  if (app == undefined) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called from an App Check verified app.'
    );
  }
}
function assertAdmin(admin: true): asserts admin {
  /* check if admin */
  if (!admin) {
    throw new functions.https.HttpsError(
      'permission-denied',
      'The function must be called as an admin.'
    );
  }
}

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

exports.createDistributedCounters = functions.runWith({enforceAppCheck: true})
  .https.onCall(async (data: { collection: string, shards: number, fields: string[] }, context) => {
    assertAppCheck(context?.app);

    assertAdmin(context.auth?.token?.admin);

    /* Initialize Admin SDK */
    const admin = await import('firebase-admin');
    if (!is_createShards_initialized) {
      admin.initializeApp();
      is_createShards_initialized = true;
    }

    try {
      const colRef = admin.firestore().collection(data.collection);
      const numberOfShards = data.shards;
      const fieldsCounts = data.fields;
      /** convert list of fields to object with strings from list as keys for object */
      function createObjectWithKeys(strings: string[]): Record<string, number> {
        return strings.reduce<Record<string, number>>((a, c) => {
          a[c] = 0;
          return a;
        }, {});
      }
      const shardDoc = createObjectWithKeys(fieldsCounts);
      const collectionDocs = await colRef.get();

      return admin.firestore().runTransaction((transaction) => {
        collectionDocs.forEach((doc) => {
          /** add number of shards to each document in collection */
          transaction.update(doc.ref, { shards: numberOfShards });

          /** create shards collection for each document */
          for (let i = 0; i < numberOfShards; i++) {
            const shardRef = doc.ref.collection(`shards`).doc(i.toString());
            transaction.set(shardRef, shardDoc);
          }
        });

        return Promise.resolve();
      }).then(() => ({ success: true, message: `Created ${collectionDocs.docs.length} shards sub-collections for the '${data.collection}' collection` }));
    } catch (error) {
      const errorMessage = (error as Error).message ?? `Something went wrong creating shards`;
      throw new functions.https.HttpsError('unknown', errorMessage, error);
    }
  });
