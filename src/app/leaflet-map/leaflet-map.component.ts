import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import 'mapbox-gl-leaflet';
import * as L from 'leaflet';
import { environment } from '../../environments/environment';
import { dummyData } from '../../specs/dummy-data';
import { FeatureCountry, CountryControl } from '../public-interfaces';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss']
})
export class LeafletMapComponent implements AfterViewInit {
  private map!: L.Map;

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  constructor() { }

  public ngAfterViewInit(): void {
    const mapStyle = 'https://maps.geoapify.com/v1/styles/osm-carto/style.json';
    const initialState = {
      lng: 11,
      lat: 49,
      zoom: 4
    };

    const map = new L.Map(this.mapContainer.nativeElement).setView(
      [initialState.lat, initialState.lng],
      initialState.zoom,
    );

    // the attribution is required for the Geoapify Free tariff plan
    map.attributionControl
      .setPrefix('')
      .addAttribution(
        'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | © OpenStreetMap <a href="https://www.openstreetmap.org/copyright" target="_blank">contributors</a>'
      );

    L.mapboxGL({
      style: `${mapStyle}?apiKey=${environment.geoApifyKey}`,
      accessToken: environment.mapboxGLApiKey,
    }).addTo(map);

    const info: CountryControl = new L.Control();

    info.onAdd = function(innerMap: any) {
      this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
      this.update();
      return this._div;
    };

    // method that we will use to update the control based on feature properties passed
    info.update = function(props: FeatureCountry['properties']) {
      this._div.innerHTML = props ? `
      <h4>${props.name}</h4>
      <span>Not visited</span>`
        : 'Hover over a state';
    };

    info.addTo(map);

    function zoomToFeature(e: any) {
      const layer = e.target as L.FeatureGroup;
      map.fitBounds(layer.getBounds());
    }
    let geoJson: L.GeoJSON;
    function resetHighlight(e: any) {
      const layer = e.target as L.FeatureGroup;
      geoJson.resetStyle(layer);
    }

    function highlightFeature(e: any) {
      const layer = e.target as L.FeatureGroup;
      const feature = e.target.feature as FeatureCountry;
      layer.setStyle({
        weight: 2,
        color: '#666',
        dashArray: '',
        fillColor: '#666',
        fillOpacity: 0
      });

      info.update(feature.properties);

      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
    }

    function onEachFeature(feature: FeatureCountry, layer: L.FeatureGroup) {
      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature,
      });
      if (feature.properties.name === 'Germany') {
        layer.setStyle({ fillColor: '#ffff' });
      }
    }

    const geoJSONOptions: L.GeoJSONOptions = {
      style: {
        fillColor: '#666',
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.2
      },
      onEachFeature,
    };

    geoJson = L.geoJSON(dummyData.countries, geoJSONOptions).addTo(map);

  }

}
