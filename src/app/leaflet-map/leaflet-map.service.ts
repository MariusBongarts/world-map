import { ElementRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as L from 'leaflet';
import { dummyData } from '../../specs/dummy-data';
import { Country, CountryControl, CountryGroup, FeatureCountry } from '../public-interfaces';
import { environment } from '../../environments/environment';

type CountryLeafletEvent = { target: CountryGroup };
@Injectable({
  providedIn: 'root'
})
export class LeafletMapService {

  private map$ = new BehaviorSubject<L.Map | undefined>(undefined);

  /** Style which gets passe to `L.mapboxGL` method. Visit: https://apidocs.geoapify.com/docs/maps/map-tiles/map-tiles */
  private mapStyles = [
    'https://maps.geoapify.com/v1/styles/dark-matter/style.json',
    'https://maps.geoapify.com/v1/styles/dark-matter-dark-grey/style.json',
    'https://maps.geoapify.com/v1/styles/dark-matter-brown/style.json',
    'https://maps.geoapify.com/v1/styles/osm-carto/style.json',
  ];

  /** Initial state of the leaflet map */
  private initialState = {
    lng: 11,
    lat: 49,
    zoom: 4
  };

  private defaultStyle = {
    fillColor: '#242525',
    weight: 1,
    opacity: 0,
    color: '#fffff00',
    // dashArray: '3',
    fillOpacity: 0.7
  };
  private highlightStyle: L.PathOptions | L.StyleFunction<any> | undefined = {
    opacity: 1,
    color: '#fffff00',
    dashArray: '3',
    fillOpacity: 0
  };

  info!: CountryControl;

  constructor() { }

  private addControl(map: L.Map) {
    this.info = new L.Control();

    this.info.onAdd = (innerMap: L.Map) => {
      this.info._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
      this.info.update();
      return this.info._div;
    };

    // method that we will use to update the control based on feature properties passed
    this.info.update = (props: Country) => {
      this.info._div.innerHTML = props ? `
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
      style: `${this.mapStyles[2]}?apiKey=${environment.geoApifyKey}`,
      accessToken: environment.mapboxGLApiKey,
    }).addTo(map);

    this.addControl(map);

    const addCountry = (country: Country) =>
      dummyData.countriesVisited.some(countryVisited =>
        countryVisited.isoA3 === country.isoA3) ? dummyData.countriesVisited =
        dummyData.countriesVisited.filter(countryVisited => countryVisited.isoA3 !== country.isoA3) :
        dummyData.countriesVisited = [...dummyData.countriesVisited, country];

    const toggleVisited = (e: CountryLeafletEvent) => {
      const layer = e.target;
      addCountry(layer.feature.properties);
      styleVisitedCountries(layer, {
        ...this.highlightStyle, color: '#ffffff', opacity: 1
      });
    };
    let geoJson: L.GeoJSON;
    function resetHighlight(e: CountryLeafletEvent) {
      const layer = e.target;
      geoJson.resetStyle(layer);
      styleVisitedCountries(layer);
    }

    const highlightFeature = (e: CountryLeafletEvent) => {
      const layer = e.target;

      styleVisitedCountries(layer, {
        color: '#ffffff',
        opacity: 1
      });

      // layer.setStyle({color: '#ffffff', opacity: 1});

      this.info.update(layer.feature.properties);


      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
    };

    const onEachFeature = (feature: FeatureCountry, layer: CountryGroup) => {
      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: toggleVisited,
      });
      styleVisitedCountries(layer);
    };

    const styleVisitedCountries = (layer: CountryGroup, overrideStyle?: L.PathOptions | L.StyleFunction<any> | undefined) => {
      const countryIsVisited = dummyData.countriesVisited.some(countryVisited => countryVisited.isoA3 === layer.feature.properties.isoA3);
      layer.setStyle({ ...overrideStyle, fillOpacity: countryIsVisited ? 0 : this.defaultStyle.fillOpacity });
    };

    const geoJSONOptions: L.GeoJSONOptions = {
      style: this.defaultStyle,
      onEachFeature,
    };

    geoJson = L.geoJSON(dummyData.countries, geoJSONOptions).addTo(map);

    this.map$.next(map);
  }
}
