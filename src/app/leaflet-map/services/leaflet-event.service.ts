import { Injectable } from '@angular/core';
import { FeatureGroup } from 'leaflet';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Country, CountryGroup, CountryLeafletEvent } from '../../public-interfaces';

type LayerEventTypes = 'clickLayer' | 'mouseoverLayer' | 'mouseoutLayer';
type CountryEventTypes = 'countryAdded' | 'countryRemoved';

interface LeafletEvent<T> {
  data: T;
  eventType: string;
}

interface LayerEvent extends LeafletEvent<CountryGroup> {
  eventType: LayerEventTypes;
}
interface CountryEvent extends LeafletEvent<CountryGroup> {
  eventType: CountryEventTypes;
}

@Injectable({
  providedIn: 'root'
})
export class LeafletEventService {
  public layerEvent$ = new Subject<LayerEvent>();
  public countryEvent$ = new Subject<CountryEvent>();

  constructor() { }

  public subscribeToLayerEvents(eventType: LayerEventTypes) {
    return this.layerEvent$.pipe(filter(event => event.eventType === eventType));
  }
  public subscribeToCountryEvents(eventType: CountryEventTypes) {
    return this.countryEvent$.pipe(filter(event => event.eventType === eventType));
  }

  public mouseoverLayer = (countryLeafletEvent: CountryLeafletEvent) => {
    this.layerEvent$.next({ data: countryLeafletEvent.target, eventType: 'mouseoverLayer' });
  }
  public mouseoutLayer = (countryLeafletEvent: CountryLeafletEvent) => {
    this.layerEvent$.next({ data: countryLeafletEvent.target, eventType: 'mouseoutLayer' });
  }
  public clickLayer = (countryLeafletEvent: CountryLeafletEvent) => {
    this.layerEvent$.next({ data: countryLeafletEvent.target, eventType: 'clickLayer' });
  }
  public countryAdded = (countryGroup: CountryGroup) => {
    this.countryEvent$.next({ data: countryGroup, eventType: 'countryAdded' });
  }
  public countryRemoved = (countryGroup: CountryGroup) => {
    this.countryEvent$.next({ data: countryGroup, eventType: 'countryRemoved' });
  }

}
