import { Country } from '../app/public-interfaces';

const countries = require('./countries.json') as GeoJSON.FeatureCollection;

const countriesVisited: Country[] = [];

export const jsonData = {
  countries,
  countriesVisited
};
