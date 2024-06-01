import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

// import { FIREBASE_ADMIN } from './firebase-modules';

// const initializedApp = () => {
//   return getApps()[0] || initializeApp(
//     // In Cloud Functions we can auto-initialize
//     process.env['FUNCTION_NAME'] ? undefined : {
//       credential: applicationDefault(),
//       databaseURL: environment.firebase.databaseURL,
//     }
//   );
// };

/** fixme: errors from below code
 *  1. No loader is configured for ".node" files:
 *  node_modules/farmhash/build/Release/farmhash.node
 *
 *  2. Could not resolve "./build/Debug/farmhash.node"
 */
// const adminInitializedApp = () => {
//   return admin.apps[0] || admin.initializeApp(
//     // In Cloud Functions we can auto-initialize
//     process.env['FUNCTION_NAME'] ? undefined : {
//       credential: admin.credential.applicationDefault(),
//       databaseURL: environment.firebase.databaseURL,
//     }
//   );
// };

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    // {
    //   provide: FIREBASE_ADMIN,
    //   useFactory: () => initializedApp(),
    // },
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
