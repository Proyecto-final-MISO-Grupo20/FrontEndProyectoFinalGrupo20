import { TestBed } from '@angular/core/testing';

import { BusinessHomeService } from './business-home.service';

describe('BusinessHomeService', () => {
  let service: BusinessHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinessHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
