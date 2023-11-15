import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from '../../../core/services/api/api.service';
import { Interview } from '../models/interview';
import { mockData_interview } from '../utils/mock-data-interviews';

@Injectable({
  providedIn: 'root',
})
export class InterviewsService {
  #api = inject(ApiService);

  getInterviews() {
    return of(mockData_interview);
  }

  createInterview(interviewData: Interview): Observable<Interview> {
    return this.#api.post('entrevista', interviewData);
  }
}
