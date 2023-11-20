import { TestBed } from '@angular/core/testing';

import { TechnicalLanguagesService } from './technical-languages.service';

describe('TechnicalLanguagesService', () => {
  let service: TechnicalLanguagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechnicalLanguagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
