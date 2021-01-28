import { ElementRef, Injectable } from '@angular/core';
import {  BehaviorSubject } from 'rxjs';
import * as L from 'leaflet';
import { jsonData } from '../../../specs/dummy-data';
import { CountryGroup, FeatureCountry } from '../../public-interfaces';
import { environment } from '../../../environments/environment';
import { LeafletCountryService } from './leaflet-country.service';
import { LeafletControlService } from './leaflet-control.service';
import { LeafletEventService } from './leaflet-event.service';
import { LeafletStyleService } from './leaflet-style.service';

@Injectable({
  providedIn: 'root'
})
export class LeafletMapService {

  public map$ = new BehaviorSubject<L.Map | undefined>(undefined);

  public geoJson!: L.GeoJSON;

  /** Initial state of the leaflet map */
  private initialState = {
    lng: 11,
    lat: 49,
    zoom: 4
  };

  constructor(private leafletCountryService: LeafletCountryService,
              private leafletEventService: LeafletEventService,
              private leafletControlService: LeafletControlService,
              private leafletStyleService: LeafletStyleService) {
  }


  public initMap(mapContainer: ElementRef<HTMLElement>) {
    const map = new L.Map(mapContainer.nativeElement, { preferCanvas: true, trackResize: false, minZoom: 4 }).setView(
      [this.initialState.lat, this.initialState.lng],
      this.initialState.zoom,
    );

    L.mapboxGL({
      style: `${this.leafletStyleService.mapStyles[3]}?apiKey=${environment.geoApifyKey}`,
      accessToken: environment.mapboxGLApiKey,
    }).addTo(map);

    this.leafletControlService.addControl(map);

    const onEachFeature = (feature: FeatureCountry, layer: CountryGroup) => {
      layer.on({
        mouseover: this.leafletEventService.mouseoverLayer,
        mouseout: this.leafletEventService.mouseoutLayer,
        click: this.leafletEventService.clickLayer,
      });
    };

    const geoJSONOptions: L.GeoJSONOptions = {
      style: this.leafletStyleService.defaultStyle,
      onEachFeature,
    };

    this.geoJson = L.geoJSON(jsonData.countries, geoJSONOptions).addTo(map);

    this.map$.next(map);

    this.leafletCountryService.colorVisitedCountries(this.geoJson);

    this.leafletStyleService.initStyles();
  }
}
