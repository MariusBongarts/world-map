import { Country } from '../app/public-interfaces';

const countries = require('./countries.json') as GeoJSON.FeatureCollection;

const countriesVisited: Country[] =
[
  {
    name: 'Germany',
    isoA3: 'DEU'
  },
  {
    name: 'France',
    isoA3: 'FRA'
  },
]
;

export const dummyData = {
  countries,
  countriesVisited
};
