import { Country } from '../app/public-interfaces';

const countries = require('./countries.json') as GeoJSON.FeatureCollection;

const countryFlags = require('./country-flags.json') as { file_url: string, alpha3: string }[];

export const jsonData = {
  countries,
  countryFlags
};
