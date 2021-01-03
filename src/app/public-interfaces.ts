
export interface Entity {
  id?: string;
}

export interface Audio extends Entity {
  base64: string;
}

export interface Country extends Entity {
  name: string;
  isoA3: string;
}
export interface CountryGroup extends L.FeatureGroup {
  feature: FeatureCountry;
}

export interface FeatureCountry extends GeoJSON.Feature<GeoJSON.MultiPoint, any>  {
  properties: Country;
}

/**
 * Control which is shown on the top-right corner in map to show information for highlighted country
 */
export interface CountryControl extends L.Control {
  // Allow additional properties
  [prop: string]: any;
}
