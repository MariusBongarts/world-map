import { Injectable } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { CountryGroup, CountryVisit, FeatureCountry } from '../../public-interfaces';
import { CountryVisitService } from '../../shared/services/country-visit.service';
import { LeafletEventService } from './leaflet-event.service';
import { LeafletStyleService } from './leaflet-style.service';

@Injectable({
  providedIn: 'root'
})
export class LeafletCountryService {

  private countriesVisited: CountryVisit[] = [];

  constructor(private countryVisitService: CountryVisitService,
              private leafletEventService: LeafletEventService,
              private leafletStyleService: LeafletStyleService) {
  }

  public colorVisitedCountries(geoJson: L.GeoJSON) {
    const isCountryVisited = (layer: CountryGroup, countriesVisited: CountryVisit[]) =>
      countriesVisited.some(countryVisited => countryVisited.countryId === layer.feature.properties.isoA3);

    this.countryVisitService.getVisitedCountriesOfUser().subscribe(
      countriesVisited => {
        (geoJson.getLayers() as CountryGroup[]).forEach(layer => {
          const countryWasVisited = isCountryVisited(layer, this.countriesVisited);
          const countryIsVisited = isCountryVisited(layer, countriesVisited);
          // Style only countries whose visited flag has changed
          if ((countryWasVisited && !countryIsVisited) || (countryIsVisited && !countryWasVisited)) {
            countryIsVisited ? this.leafletEventService.countryAdded(layer) : this.leafletEventService.countryRemoved(layer);
          }
        });
        this.countriesVisited = countriesVisited;
      });

    this.listenForEvents();
  }

  private listenForEvents() {
    this.leafletEventService.subscribeToLayerEvents('clickLayer').subscribe(event => {
      this.countryVisitService.addOrDelete({ countryId: event.data.feature.properties.isoA3 });
    });
  }
}
