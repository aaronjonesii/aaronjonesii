import { NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { initializeAppCheck, provideAppCheck, ReCaptchaV3Provider } from '@angular/fire/app-check';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { getFunctions, provideFunctions } from "@angular/fire/functions";
import { getAnalytics, isSupported } from "@angular/fire/analytics";

const FIREBASE_MODULES = [
  provideFirebaseApp(() => {
    const app = initializeApp(environment.firebase);

    /** Google Analytics */
    isSupported().then((supported: boolean) => {
      if (supported) getAnalytics(app);
    });

    return app;
  }),
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
    BrowserModule,
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
