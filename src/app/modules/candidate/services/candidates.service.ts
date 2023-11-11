import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from '../../../core/services/api/api.service';
import { Candidate } from '../models/candidate';
import {  mockData_candidates} from '../utils/mock-data-candidates';


@Injectable({
  providedIn: 'root',
})
export class CandidatesService {
  #api = inject(ApiService);

  getCandidates() {
    return of(mockData_candidates);
  }
}
