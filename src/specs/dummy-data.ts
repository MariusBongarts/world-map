import { Country } from '../app/public-interfaces';

const countries = require('./countries.json') as GeoJSON.FeatureCollection;

export const jsonData = {
  countries,
};
