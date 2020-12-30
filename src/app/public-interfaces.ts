
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

export interface FeatureCountry extends GeoJSON.Feature<GeoJSON.MultiPolygon, any>  {
  properties: CountryProperties;
}


/**
 * Control which is shown on the top-right corner in map to show information for highlighted country
 */
export interface CountryControl extends L.Control {
  // Allow additional properties
  [prop: string]: any;
}
