import * as functions from "firebase-functions";
import * as logs from "./logs";
import { FieldValue } from '@google-cloud/firestore';

let is_onCreation_initialized = false;
let is_update_initialized = false;

exports.onCreation = functions.auth.user().onCreate(async (user) => {
  const admin = await import('firebase-admin');
  if (!is_onCreation_initialized) {
    admin.initializeApp();
    is_onCreation_initialized = true;
  }

  try {
    logs.savingUser(user.uid);

    const batch = admin.firestore().batch();

    /** save user into db */
    const {email, uid, displayName, photoURL, phoneNumber} = user;
    const userRef = admin.firestore().doc(`users/${uid}`);
    batch.set(userRef, {
      displayName,
      email,
      photoURL,
      phoneNumber,
      joined: FieldValue.serverTimestamp(),
      admin: false,
    }, {merge: true});

    /** todo: send welcome email with template */
    const mailRef = admin.firestore().collection('mail').doc();
    batch.set(mailRef, {
      to: user.email,
      bcc: 'hello@aaronjonesii.dev',
      message: {
        subject: `Welcome to aaronjonesii.dev${user.displayName ? `, ${user.displayName}` : ''}`,
        text: 'Thank you for your interest, I would like to welcome you to my personal website where' +
          'I display my projects and ideas. It is currently a work in progress but feel free to comment on' +
          'projects after you have read and agree to the guidelines located in the Terms of Use.'
      }
    });

    batch.commit()
      .then(() => {
        logs.firestoreDocCreated(`users`, uid);
        logs.firestoreDocCreated(`mail`, mailRef.id);
      }).catch((error: Error) => logs.errorSavingUser(error))
  } catch (error) { logs.errorSavingUser(error as Error); }
});

exports.update = functions.https.onCall(async(data, context) => {
  /** Initialize Admin SDK */
  const admin = require('firebase-admin');
  if (!is_update_initialized) {
    admin.initializeApp();
    is_update_initialized = true;
  }
  /** Assert Authentication */
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called while authenticated.'
    );
  }
  const uid: string = context.auth.uid;
  try {
    return await admin.auth().updateUser(uid, data)
      .then(async(user: any) => {
        /** Updated user in Firebase Authentication */
        logs.updatedUser(user.uid);

        const userPath: string = `users/${user.uid}`;
        const userRef = admin.firestore().doc(userPath);
        const userComments = await admin.firestore().collectionGroup('comments')
          .where('user', '==', userRef).get();
        const userProjects = await admin.firestore().collection(`projects`)
          .where(`roles.${uid}`, '==', 'owner').get();
        logs.savingUser(userPath);
        return admin.firestore().runTransaction((transaction: any) => {
          /** Save updates to User Document */
          transaction.set(userRef, {
            displayName: user.displayName ?? null,
            email: user.email,
            phoneNumber: user.phoneNumber ?? null,
            photoURL: user.photoURL ?? null
          }, {merge: true});

          /** Update User Comments to reflect updates */
          if (!userComments.empty) {
            logs.updatingUserComments(userComments.size);
            userComments.forEach((comment: any) => transaction.update(
              comment.ref,
              {
                author: {
                  name: user.displayName ?? null,
                  image: user.photoURL ?? null
                }
              }
            ));
          }

          /** Update User Projects to reflect updates */
          if (!userProjects.empty) {
            logs.updatingUserProjects(userProjects.size);
            userProjects.forEach((project: any) => transaction.update(
              project.ref,
              {
                author: {
                  name: user.displayName ?? null,
                  image: user.photoURL ?? null
                }
              }
            ));
          }

          return Promise.resolve();
        }).then(() => {
          if (!userComments.empty) {
            userComments.forEach((docSnap: any) => logs.firestoreDocUpdated(docSnap.ref.parent.path, docSnap.id));
          }
          if (!userProjects.empty) {
            userProjects.forEach((docSnap: any) => logs.firestoreDocUpdated(docSnap.ref.parent.path, docSnap.id));
          }
          logs.firestoreDocUpdated('users', userRef.id);
          const response = { succes: true, message: `Successfully updated user profile` };
          if (!userComments.empty) response.message = response.message + ', and updated '+userComments.size+((userComments.size === 1) ? ' comment' : ' comments');
          if (!userProjects.empty) response.message = response.message + ', and updated '+userProjects.size+((userProjects.size === 1) ? ' project' : ' projects');
          return response;
        }).catch((error: Error) => {
          logs.errorSavingUser(error);
          throw new Error(error.message);
        });
      })
      .catch((error: Error) => {
        logs.errorUpdatingUser(error);
        throw new Error(error.message);
      });
  } catch (error: any) {
    throw new functions.https.HttpsError('unknown', error.message, error);
  }
});
