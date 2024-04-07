import { isDevMode, NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { initializeAppCheck, provideAppCheck, ReCaptchaV3Provider } from '@angular/fire/app-check';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { connectFunctionsEmulator, getFunctions, provideFunctions } from "@angular/fire/functions";
import { getAnalytics, isSupported, ScreenTrackingService, UserTrackingService } from "@angular/fire/analytics";
import { ServiceWorkerModule } from "@angular/service-worker";
import { connectAuthEmulator, getAuth, provideAuth } from "@angular/fire/auth";
import { connectFirestoreEmulator, getFirestore, provideFirestore } from "@angular/fire/firestore";
import { connectStorageEmulator, getStorage, provideStorage } from "@angular/fire/storage";

let firestoreEmulatorStarted = false;

const FIREBASE_MODULES = [
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
    if (!environment.production) {
      connectAuthEmulator(auth, 'http://localhost:9099', {disableWarnings: true});
    }
    return auth;
  }),
  provideAppCheck(() =>  {
    const provider = new ReCaptchaV3Provider(environment.recaptcha3SiteKey);
    return initializeAppCheck(undefined, { provider, isTokenAutoRefreshEnabled: true });
  }),
  provideFirestore(() => {
    const firestore = getFirestore();
    if (!firestoreEmulatorStarted) {
      if (!environment.production) {
        connectFirestoreEmulator(firestore, 'localhost', 8080);
      }
      firestoreEmulatorStarted = true;
    }
    return firestore;
  }),
  provideStorage(() => {
    const storage = getStorage();
    if (!environment.production) {
      connectStorageEmulator(storage, 'localhost', 9199);
    }
    return storage;
  }),
  provideFunctions(() => {
    const functions = getFunctions();
    if (!environment.production) {
      connectFunctionsEmulator(functions, 'localhost', 5001);
    }
    return functions;
  })
];

const GLOBAL_ANGULAR_MATERIAL_MODULES = [MatSnackBarModule];

const GLOBAL_MODULES = [CommonModule];

@NgModule({
  providers: [ScreenTrackingService, UserTrackingService],
  declarations: [],
  imports: [
    BrowserModule.withServerTransition({ appId: 'aaronjonesiiDev' }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule,
    ...GLOBAL_MODULES,
    ...FIREBASE_MODULES,
    ...GLOBAL_ANGULAR_MATERIAL_MODULES
  ],
  exports: [ ...GLOBAL_MODULES ]
})
export class CoreModule { }
