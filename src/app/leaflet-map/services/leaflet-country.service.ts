import { Injectable } from '@angular/core';
import { jsonData } from '../../../specs/dummy-data';
import { Country, CountryGroup, CountryVisit, FeatureCountry } from '../../public-interfaces';
import { CountryVisitService } from '../../shared/services/country-visit.service';
import { LeafletEventService } from './leaflet-event.service';

@Injectable({
  providedIn: 'root'
})
export class LeafletCountryService {

  private countriesVisited: CountryVisit[] = [];

  constructor(private countryVisitService: CountryVisitService, private leafletEventService: LeafletEventService) {
  }

  public isCountryVisited(country: Pick<Country, 'isoA3'>, countriesVisited?: CountryVisit[]) {
    return (countriesVisited || this.countriesVisited).some(countryVisited => countryVisited.countryId === country.isoA3);
  }

  public checkForCountryChanges(geoJson: L.GeoJSON) {

    this.countryVisitService.visitedCountriesOfUser.subscribe(
      countriesVisited => {
        (geoJson.getLayers() as CountryGroup[]).forEach(layer => {
          const countryWasVisited = this.isCountryVisited({ isoA3: layer.feature.properties.isoA3 }, this.countriesVisited);
          const countryIsVisited = this.isCountryVisited({ isoA3: layer.feature.properties.isoA3 }, countriesVisited);
          // Style only countries whose visited flag has changed
          if ((countryWasVisited && !countryIsVisited) || (countryIsVisited && !countryWasVisited)) {
            this.leafletEventService.next(countryIsVisited ? 'countryAdded' : 'countryRemoved', { data: layer });
          }
        });
        this.countriesVisited = countriesVisited;
      });
  }
}
