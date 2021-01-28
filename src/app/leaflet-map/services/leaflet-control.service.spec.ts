import { TestBed } from '@angular/core/testing';

import { LeafletControlService } from './leaflet-control.service';

describe('LeafletControlService', () => {
  let service: LeafletControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeafletControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
