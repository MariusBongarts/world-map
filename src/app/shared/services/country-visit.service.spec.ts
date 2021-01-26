import { TestBed } from '@angular/core/testing';

import { CountryVisitService } from './country-visit.service';

describe('CountryVisitService', () => {
  let service: CountryVisitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryVisitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
