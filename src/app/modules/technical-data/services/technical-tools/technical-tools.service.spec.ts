import { TestBed } from '@angular/core/testing';

import { TechnicalToolsService } from './technical-tools.service';

describe('TechnicalToolsService', () => {
  let service: TechnicalToolsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechnicalToolsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
