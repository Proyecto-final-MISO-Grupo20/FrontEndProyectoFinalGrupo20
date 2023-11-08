import { TestBed } from '@angular/core/testing';

import { CandidateHomeService } from './candidate-home.service';

describe('CandidateHomeService', () => {
  let service: CandidateHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidateHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
