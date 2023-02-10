import { isDevMode, NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { initializeAppCheck, provideAppCheck, ReCaptchaV3Provider } from '@angular/fire/app-check';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { getFunctions, provideFunctions } from "@angular/fire/functions";
import { getAnalytics, isSupported } from "@angular/fire/analytics";
import { ServiceWorkerModule } from "@angular/service-worker";
import { getAuth, provideAuth } from "@angular/fire/auth";

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
  provideFunctions(() => getFunctions())
];

const GLOBAL_ANGULAR_MATERIAL_MODULES = [MatSnackBarModule];

const GLOBAL_COMPONENTS = []!;

const GLOBAL_MODULES = [CommonModule];

@NgModule({
  declarations: [...GLOBAL_COMPONENTS],
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
  exports: [
    ...GLOBAL_COMPONENTS,
    ...GLOBAL_MODULES
  ]
})
export class CoreModule { }
