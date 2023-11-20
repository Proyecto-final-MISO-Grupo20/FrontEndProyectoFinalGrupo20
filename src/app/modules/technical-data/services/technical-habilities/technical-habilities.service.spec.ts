import { TestBed } from '@angular/core/testing';

import { TechnicalHabilitiesService } from './technical-habilities.service';

describe('TechnicalHabilitiesService', () => {
  let service: TechnicalHabilitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechnicalHabilitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
