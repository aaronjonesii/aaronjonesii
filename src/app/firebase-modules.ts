import {
  importProvidersFrom, isDevMode,
} from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import {
  getAnalytics, isSupported,
  ScreenTrackingService, UserTrackingService,
} from '@angular/fire/analytics';
import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';
import {
  connectFirestoreEmulator, getFirestore, provideFirestore,
} from '@angular/fire/firestore';
import {
  connectStorageEmulator, getStorage, provideStorage,
} from '@angular/fire/storage';
import {
  connectFunctionsEmulator, getFunctions, provideFunctions,
} from '@angular/fire/functions';

// import type { app } from 'firebase-admin';
// export const FIREBASE_ADMIN = new InjectionToken<app.App>('firebase-admin');

let firestoreEmulatorStarted = false;

// const provideFirebaseAppCheck = () => {
//   return provideAppCheck((injector) => {
//     const admin = injector.get<app.App|null>(FIREBASE_ADMIN, null);
//     if (admin) {
//       /** fixme: error below for admin.appCheck()
//        * @firebase/app-check: TypeError: admin.appCheck is not a function
//        */
//       console.debug('admin app', admin);
//       const provider = new CustomProvider({
//         getToken: () => admin.appCheck().createToken(
//             environment.firebase.appId,
//             { ttlMillis: 604_800_000 /* 1 week */ },
//         ).then(({ token, ttlMillis: expireTimeMillis }) => {
//             return { token, expireTimeMillis };
//         }),
//       });
//       return initializeAppCheck(
//         getApp(),
//         { provider, isTokenAutoRefreshEnabled: false },
//       );
//     } else {
// eslint-disable-next-line max-len
//       const provider = new ReCaptchaV3Provider(environment.recaptcha3SiteKey);
//       return initializeAppCheck(
//         getApp(),
//         { provider, isTokenAutoRefreshEnabled: true },
//       );
//     }
//   }, [new Optional(), FIREBASE_ADMIN]);
// };

const FirebaseModules = [
  provideFirebaseApp(() => {
    const app = initializeApp(environment.firebase);

    /** Google Analytics */
    isSupported().then((supported: boolean) => {
      if (supported) getAnalytics(app);
    });

    return app;
  }),
  provideAuth(() => {
    const auth = getAuth();
    if (isDevMode()) {
      connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
    }
    return auth;
  }),
  // provideFirebaseAppCheck(),
  provideFirestore(() => {
    const firestore = getFirestore();
    if (!firestoreEmulatorStarted) {
      if (isDevMode()) {
        connectFirestoreEmulator(firestore, 'localhost', 8080);
      }
      firestoreEmulatorStarted = true;
    }
    return firestore;
  }),
  provideStorage(() => {
    const storage = getStorage();
    if (isDevMode()) {
      connectStorageEmulator(storage, 'localhost', 9199);
    }
    return storage;
  }),
  provideFunctions(() => {
    const functions = getFunctions();
    if (isDevMode()) {
      connectFunctionsEmulator(functions, 'localhost', 5001);
    }
    return functions;
  }),
];
export const FirebaseProviders = [
  importProvidersFrom(...FirebaseModules),
  ScreenTrackingService,
  UserTrackingService,
];
