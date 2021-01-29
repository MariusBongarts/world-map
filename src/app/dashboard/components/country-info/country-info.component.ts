import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from '../../../public-interfaces';
import { HandleUnsubscribeDirective } from '../../../shared/directives/handle-unsubscribe.directive';
import { CountryVisitService } from '../../../shared/services/country-visit.service';

@Component({
  selector: 'app-country-info',
  templateUrl: './country-info.component.html',
  styleUrls: ['./country-info.component.scss'],
})
export class CountryInfoComponent extends HandleUnsubscribeDirective implements OnChanges {
  @Input() country!: Country | null;

  isCountryVisited$!: Observable<boolean>;

  constructor(public countryVisitService: CountryVisitService) {
    super();
  }

  public ngOnChanges(): void {
    if (this.country) {
      this.isCountryVisited$ = this.countryVisitService.isCountryVisited(this.country.isoA3);
    }
  }

  public async toggleVisited() {
    return this.countryVisitService.addOrDelete({ countryId: this.country!.isoA3 });
  }

}
