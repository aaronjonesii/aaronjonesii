import * as functions from "firebase-functions";
import * as logs from "./logs";

let is_onCreation_initialized = false;

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
      joined: admin.firestore.FieldValue.serverTimestamp(),
      admin: false
    }, {merge: true});

    /** send welcome email */
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
