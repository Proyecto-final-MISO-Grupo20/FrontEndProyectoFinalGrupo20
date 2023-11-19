import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from '../../../core/services/api/api.service';
import { Interview } from '../models/interview';
import { mockData_participants } from '../utils/mock-data-participants';

@Injectable({
  providedIn: 'root',
})
export class InterviewsService {
  #api = inject(ApiService);

  getInterviews(): Observable<Interview[]> {
    return this.#api.get('entrevistas');
  }

  createInterview() {
    return of(mockData_participants);
  }
}
