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
    this.leafletEventService.subscribeToLayerEvents('mouseoverLayer').subscribe(event => this.highlightFeature(event.data));
    this.leafletEventService.subscribeToLayerEvents('mouseoutLayer').subscribe(event => this.resetHighlight(event.data));
    this.leafletEventService.subscribeToCountryEvents('countryAdded').subscribe(event => this.markAsVisited(event.data));
    this.leafletEventService.subscribeToCountryEvents('countryRemoved').subscribe(event => this.markAsUnvisited(event.data));
  }

  private resetHighlight(countryGroup: CountryGroup) {
    countryGroup.setStyle({ opacity: this.defaultStyle.opacity });
  }

  private highlightFeature(countryGroup: CountryGroup) {
    countryGroup.setStyle({ opacity: this.highlightStyle.opacity });
    this.leafletControlService.info.update(countryGroup.feature.properties);
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
