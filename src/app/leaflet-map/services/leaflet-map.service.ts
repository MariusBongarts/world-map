import { ElementRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as L from 'leaflet';
import { jsonData } from '../../../specs/dummy-data';
import { CountryGroup, CountryLeafletEvent, FeatureCountry } from '../../public-interfaces';
import { environment } from '../../../environments/environment';
import { LeafletCountryService } from './leaflet-country.service';
import { LeafletControlService } from './leaflet-control.service';
import { LayerEventTypes, LeafletEventService } from './leaflet-event.service';
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

  constructor(private leafletCountryService: LeafletCountryService, private leafletEventService: LeafletEventService,
              private leafletControlService: LeafletControlService, private leafletStyleService: LeafletStyleService) {
  }


  public initMap(mapContainer: ElementRef<HTMLElement>) {
    const map = new L.Map(mapContainer.nativeElement,
      { preferCanvas: false, trackResize: false, minZoom: 2 }).setView(
        [this.initialState.lat, this.initialState.lng],
        this.initialState.zoom,
      );

    L.mapboxGL({
      style: `${this.leafletStyleService.mapStyles[3]}?apiKey=${environment.geoApifyKey}`,
      accessToken: environment.mapboxGLApiKey,
    }).addTo(map);

    this.leafletControlService.addControl(map);

    const layerEvent = (countryLeafletEvent: CountryLeafletEvent) => {
      this.leafletEventService.next(`${countryLeafletEvent.type}Layer` as LayerEventTypes, { data: countryLeafletEvent.target });
    };

    const onEachFeature = (feature: FeatureCountry, layer: CountryGroup) => {
      // TODO: This fixes that layers are not showing wile the user drags. Still this solution reduces the performance of the app!
      // map.getRenderer(layer as any).options.padding = 1;
      layer.on({
        mouseover: layerEvent,
        mouseout: layerEvent,
        click: layerEvent,
      });
    };

    const geoJSONOptions: L.GeoJSONOptions = {
      style: { ...this.leafletStyleService.defaultStyle },
      onEachFeature,
    };

    this.geoJson = L.geoJSON(jsonData.countries, geoJSONOptions).addTo(map);

    this.map$.next(map);

    this.leafletCountryService.checkForCountryChanges(this.geoJson);

    this.leafletStyleService.initStyles();
  }
}
