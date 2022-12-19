import { NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../../environments/environment';
import {
  getFirestore,
  provideFirestore
} from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, isSupported } from '@angular/fire/analytics';
import { initializeAppCheck, provideAppCheck, ReCaptchaV3Provider } from '@angular/fire/app-check';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { CommonModule } from '@angular/common';

const FIREBASE_MODULES = [
  provideAuth(() => getAuth()),
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
  provideFirestore(() => getFirestore()),
  provideStorage(() => getStorage()),
  provideFunctions(() => getFunctions())
];

const GLOBAL_ANGULAR_MATERIAL_MODULES = []!;

const GLOBAL_COMPONENTS = []!;

const GLOBAL_MODULES = [CommonModule];

@NgModule({
  declarations: [...GLOBAL_COMPONENTS],
  imports: [
    BrowserModule,
    ...GLOBAL_MODULES,
    // ...FIREBASE_MODULES,
    ...GLOBAL_ANGULAR_MATERIAL_MODULES
  ],
  exports: [
    ...GLOBAL_COMPONENTS,
    ...GLOBAL_MODULES
  ]
})
export class CoreModule { }
