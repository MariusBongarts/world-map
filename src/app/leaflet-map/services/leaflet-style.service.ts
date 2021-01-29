import { Injectable } from '@angular/core';
import { CountryGroup, CountryLeafletEvent, FeatureCountry } from '../../public-interfaces';
import * as L from 'leaflet';
import { LeafletControlService } from './leaflet-control.service';
import { LeafletEventService } from './leaflet-event.service';

@Injectable({
  providedIn: 'root'
})
export class LeafletStyleService {

  constructor(private leafletControlService: LeafletControlService, private leafletEventService: LeafletEventService) {
  }

  /** Style which gets passe to `L.mapboxGL` method. Visit: https://apidocs.geoapify.com/docs/maps/map-tiles/map-tiles */
  public mapStyles = [
    'https://maps.geoapify.com/v1/styles/dark-matter/style.json',
    'https://maps.geoapify.com/v1/styles/dark-matter-dark-grey/style.json',
    'https://maps.geoapify.com/v1/styles/dark-matter-brown/style.json',
    'https://maps.geoapify.com/v1/styles/osm-carto/style.json',
  ];

  public defaultStyle = {
    fillColor: '#242525',
    weight: 1,
    opacity: 0.2,
    color: '#ffffff',
    fillOpacity: 0.8
  };

  private highlightStyle = {
    opacity: 1,
  };

  public initStyles() {
    this.leafletEventService.subscribe('mouseoverLayer').subscribe(event => this.highlightFeature(event.data));
    this.leafletEventService.subscribe('mouseoutLayer').subscribe(event => this.resetHighlight(event.data));
    this.leafletEventService.subscribe('countryAdded').subscribe(event => this.markAsVisited(event.data));
    this.leafletEventService.subscribe('countryRemoved').subscribe(event => this.markAsUnvisited(event.data));
  }

  private resetHighlight(countryGroup: CountryGroup) {
    countryGroup.setStyle({ opacity: this.defaultStyle.opacity });
  }

  private highlightFeature(countryGroup: CountryGroup) {
    countryGroup.setStyle({ opacity: this.highlightStyle.opacity });
    // this.leafletControlService.info?.update(countryGroup.feature.properties);
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      countryGroup.bringToFront();
    }
  }

  private markAsVisited(countryGroup: CountryGroup) {
    countryGroup.setStyle({ fillOpacity: 0 });
  }
  private markAsUnvisited(countryGroup: CountryGroup) {
    countryGroup.setStyle({ fillOpacity: this.defaultStyle.fillOpacity });
  }
}
