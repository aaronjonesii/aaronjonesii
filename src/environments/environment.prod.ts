import { FIREBASE_API_KEY, RECAPTCHA3_SITE_KEY } from "./keys";

export const environment = {
  firebase: {
    apiKey: FIREBASE_API_KEY,
    authDomain: "aaronjonesii.firebaseapp.com",
    databaseURL: 'https://aaronjonesii-default-rtdb.firebaseio.com',
    projectId: "aaronjonesii",
    storageBucket: "aaronjonesii.appspot.com",
    messagingSenderId: "787409657894",
    appId: "1:787409657894:web:b849ed20de78a963e2c6e7",
    measurementId: "G-MQ2QLLLEQ7"
  },
  recaptcha3SiteKey: RECAPTCHA3_SITE_KEY,
};
