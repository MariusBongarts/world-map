// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { environmentSecret } from './environment.secret';

export const environment = {
  production: false,
  firebaseConfig: environmentSecret.firebaseConfig,
  // You get one here: https://myprojects.geoapify.com/
  geoApifyKey: environmentSecret.geoApifyKey,
  // You get one here: https://account.mapbox.com/access-tokens
  mapboxGLApiKey: environmentSecret.mapboxGLApiKey,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
