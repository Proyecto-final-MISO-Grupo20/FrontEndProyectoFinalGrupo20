import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api/api.service';
import { Interview } from '../models/interview';
import { CreateInterviewDto } from '../dto/create-interview.dto';
import { qualifyInterviewDto } from '../dto/qualify-interview.dto';

@Injectable({
  providedIn: 'root',
})
export class InterviewsService {
  #api = inject(ApiService);

  getInterviews(): Observable<Interview[]> {
    return this.#api.get('entrevistas');
  }

  createInterview(interviewData: CreateInterviewDto) {
    return this.#api.post('entrevistas', interviewData);
  }

  qualifyInterview(interviewData: qualifyInterviewDto) {
    return this.#api.post('entrevistas/qualify', interviewData);
  }
}
