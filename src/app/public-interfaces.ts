import { FeatureGroup } from 'leaflet';

export interface Entity {
  id?: string;
}

export interface Audio extends Entity {
  base64: string;
}

export interface CountryProperties {
  name: string;
  id: string;
}

export interface FeatureCountry extends GeoJSON.FeatureCollection  {
  properties: CountryProperties;
}

export interface FeatureGroupCountry extends L.FeatureGroup {
  feature: FeatureCountry;
}
