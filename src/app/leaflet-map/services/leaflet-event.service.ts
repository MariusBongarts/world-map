import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CountryGroup, CountryLeafletEvent } from '../../public-interfaces';

export type LayerEventTypes = 'clickLayer' | 'mouseoverLayer' | 'mouseoutLayer';

type CountryEventTypes = 'countryAdded' | 'countryRemoved';



type AllEventTypes = LayerEventTypes | CountryEventTypes;
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

type TypeToInterface<Type extends AllEventTypes> = Type extends LayerEventTypes ? LayerEvent : CountryEvent;

type AllEvents = LayerEvent | CountryEvent;

@Injectable({
  providedIn: 'root'
})
export class LeafletEventService {
  public event$ = new Subject<AllEvents>();

  public subscribe<Type extends AllEventTypes>(eventType: Type) {
    return this.event$.pipe(filter(event => event.eventType === eventType)) as Observable<TypeToInterface<Type>>;
  }

  public next<Type extends AllEventTypes>(eventType: AllEventTypes, event: Omit<TypeToInterface<Type>, 'eventType'>) {
    this.event$.next({...event, eventType});
  }

}
