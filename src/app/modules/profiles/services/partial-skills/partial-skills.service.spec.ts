import { TestBed } from '@angular/core/testing';

import { PartialSkillsService } from './partial-skills.service';

describe('PartialSkillsService', () => {
  let service: PartialSkillsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartialSkillsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
