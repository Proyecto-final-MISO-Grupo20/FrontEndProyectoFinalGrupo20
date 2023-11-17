import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from '../../../core/services/api/api.service';
import { Interview } from '../models/interview';
import { mockData_interview } from '../utils/mock-data-interviews';
import { mockData_participants } from '../utils/mock-data-participants';

@Injectable({
  providedIn: 'root',
})
export class InterviewsService {
  #api = inject(ApiService);

  getInterviews() {
    return of(mockData_interview);
  }

  createInterview() {
    return of(mockData_participants);
  }
}
