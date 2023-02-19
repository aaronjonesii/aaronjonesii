// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { FIREBASE_API_KEY, RECAPTCHA3_SITE_KEY } from "./keys";

export const environment = {
  production: false,
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
