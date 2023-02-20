import { isDevMode, NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { initializeAppCheck, provideAppCheck, ReCaptchaV3Provider } from '@angular/fire/app-check';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { getFunctions, provideFunctions } from "@angular/fire/functions";
import { getAnalytics, isSupported, ScreenTrackingService, UserTrackingService } from "@angular/fire/analytics";
import { ServiceWorkerModule } from "@angular/service-worker";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { LayoutModule } from "../shared/components/layout/layout.module";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { getStorage, provideStorage } from "@angular/fire/storage";

const FIREBASE_MODULES = [
  provideFirebaseApp(() => {
    const app = initializeApp(environment.firebase);

    /** Google Analytics */
    isSupported().then((supported: boolean) => {
      if (supported) getAnalytics(app);
    });

    return app;
  }),
  provideAuth(() => getAuth()),
  provideAppCheck(() =>  {
    const provider = new ReCaptchaV3Provider(environment.recaptcha3SiteKey);
    return initializeAppCheck(undefined, { provider, isTokenAutoRefreshEnabled: true });
  }),
  provideFirestore(() => getFirestore()),
  provideStorage(() => getStorage()),
  provideFunctions(() => getFunctions())
];

const GLOBAL_ANGULAR_MATERIAL_MODULES = [MatSnackBarModule];

const GLOBAL_MODULES = [CommonModule, LayoutModule];

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
