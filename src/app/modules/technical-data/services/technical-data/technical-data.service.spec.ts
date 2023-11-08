import { TestBed } from '@angular/core/testing';

import { TechnicalDataService } from './technical-data.service';

describe('TechnicalDataService', () => {
  let service: TechnicalDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechnicalDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
