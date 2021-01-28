import { TestBed } from '@angular/core/testing';

import { LeafletEventService } from './leaflet-event.service';

describe('LeafletEventService', () => {
  let service: LeafletEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeafletEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
