import { environmentSecret } from './environment.secret';

export const environment = {
  production: true,
  firebaseConfig: environmentSecret.firebaseConfig,
  geoApifyKey: environmentSecret.geoApifyKey,
  mapboxGLApiKey: environmentSecret.mapboxGLApiKey,
};
