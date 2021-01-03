import { ElementRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as L from 'leaflet';
import { dummyData } from '../../specs/dummy-data';
import { Country, CountryControl, CountryGroup, FeatureCountry } from '../public-interfaces';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeafletMapService {

  private map = new BehaviorSubject<L.Map | undefined>(undefined);

  /** Style which gets passe to `L.mapboxGL` method */
  private mapStyle = 'https://maps.geoapify.com/v1/styles/osm-carto/style.json';

  /** Initial state of the leaflet map */
  private initialState = {
    lng: 11,
    lat: 49,
    zoom: 4
  };

  info!: CountryControl;

  constructor() { }

  private addControl(map: L.Map) {
    this.info = new L.Control();

    this.info.onAdd = function (innerMap: any) {
      this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
      this.update();
      return this._div;
    };

    // method that we will use to update the control based on feature properties passed
    this.info.update = function (props: Country) {
      this._div.innerHTML = props ? `
      <h4>${props.name}</h4>
      <span>Not visited</span>`
        : 'Hover over a state';
    };

    this.info.addTo(map);
  }

  public initMap(mapContainer: ElementRef<HTMLElement>) {
    const map = new L.Map(mapContainer.nativeElement, { preferCanvas: true }).setView(
      [this.initialState.lat, this.initialState.lng],
      this.initialState.zoom,
    );

    // the attribution is required for the Geoapify Free tariff plan
    map.attributionControl
      .setPrefix('')
      .addAttribution(
        'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | © OpenStreetMap <a href="https://www.openstreetmap.org/copyright" target="_blank">contributors</a>'
      );

    L.mapboxGL({
      style: `${this.mapStyle}?apiKey=${environment.geoApifyKey}`,
      accessToken: environment.mapboxGLApiKey,
    }).addTo(map);

    this.addControl(map);

    const addCountry = (country: Country) =>
      dummyData.countriesVisited.some(countryVisited =>
        countryVisited.isoA3 === country.isoA3) ? dummyData.countriesVisited =
        dummyData.countriesVisited.filter(countryVisited => countryVisited.isoA3 !== country.isoA3) :
        dummyData.countriesVisited = [...dummyData.countriesVisited, country];

    function addToVisited(e: any) {
      const layer = e.target as CountryGroup;
      addCountry(layer.feature.properties);
      styleVisitedCountries(layer);
    }
    let geoJson: L.GeoJSON;
    function resetHighlight(e: any) {
      const layer = e.target as CountryGroup;
      geoJson.resetStyle(layer);
      styleVisitedCountries(layer);
    }

    const highlightFeature = (e: any) => {
      const layer = e.target as CountryGroup;
      layer.setStyle({
        weight: 2,
        color: '#666',
        dashArray: '',
        fillColor: '#666',
        fillOpacity: 0
      });

      this.info.update(layer.feature.properties);


      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
    }

    const onEachFeature = (feature: FeatureCountry, layer: CountryGroup) => {
      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: addToVisited,
      });
      styleVisitedCountries(layer);
    };

    const styleVisitedCountries = (layer: CountryGroup) => {
      if (dummyData.countriesVisited.some(countryVisited => countryVisited.isoA3 === layer.feature.properties.isoA3)) {
        layer.setStyle({ fillColor: '#ffff' });
      }
    };

    const geoJSONOptions: L.GeoJSONOptions = {
      style: {
        fillColor: '#242525',
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.25
      },
      onEachFeature,
    };

    geoJson = L.geoJSON(dummyData.countries, geoJSONOptions).addTo(map);

    this.map.next(map);
  }
}
