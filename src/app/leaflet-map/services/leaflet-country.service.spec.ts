import { TestBed } from '@angular/core/testing';

import { LeafletCountryService } from './leaflet-country.service';

describe('LeafletCountryService', () => {
  let service: LeafletCountryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeafletCountryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
