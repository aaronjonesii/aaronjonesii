import { importProvidersFrom, PLATFORM_ID, inject, isDevMode } from "@angular/core";
import { getApp, initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { environment } from "../environments/environment";
import { getAnalytics, isSupported, ScreenTrackingService, UserTrackingService } from "@angular/fire/analytics";
import { connectAuthEmulator, getAuth, provideAuth } from "@angular/fire/auth";
import {
  AppCheck,
  initializeAppCheck,
  provideAppCheck,
  ReCaptchaV3Provider
} from "@angular/fire/app-check";
import { connectFirestoreEmulator, getFirestore, provideFirestore } from "@angular/fire/firestore";
import { connectStorageEmulator, getStorage, provideStorage } from "@angular/fire/storage";
import { connectFunctionsEmulator, getFunctions, provideFunctions } from "@angular/fire/functions";
import { isPlatformServer } from "@angular/common";

let firestoreEmulatorStarted = false;

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
      connectAuthEmulator(auth, 'http://localhost:9099', {disableWarnings: true});
    }
    return auth;
  }),
  provideAppCheck((): AppCheck =>  {
    const platformId = inject(PLATFORM_ID);
    if (isPlatformServer(platformId)) return new AppCheck({ app: getApp() });

    const provider = new ReCaptchaV3Provider(environment.recaptcha3SiteKey);
    return initializeAppCheck(undefined, { provider, isTokenAutoRefreshEnabled: true });
  }),
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