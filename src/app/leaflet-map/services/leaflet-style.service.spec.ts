import { TestBed } from '@angular/core/testing';

import { LeafletStyleService } from './leaflet-style.service';

describe('LeafletStyleService', () => {
  let service: LeafletStyleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeafletStyleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
