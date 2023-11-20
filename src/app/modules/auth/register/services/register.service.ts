import { Injectable, inject } from '@angular/core';
import { ApiService } from '../../../../core/services/api/api.service';
import { Candidate } from '../models/candidate';
import { Business } from '../models/business';
import { Observable } from 'rxjs';
import { BusinessType } from '../models/business-type';
import { BusinessSegment } from '../models/business-segments';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  #api = inject(ApiService);

  createCandidateAccount(candidateData: Candidate): Observable<Candidate> {
    return this.#api.post('usuario/candidato', candidateData);
  }
  createBusinessAccount(candidateData: Business): Observable<Business> {
    return this.#api.post('usuario/empresa', candidateData);
  }

  getBusinessTypes(): Observable<BusinessType[]> {
    return this.#api.get('empresa/tipos');
  }

  getBusinessSegments(): Observable<BusinessSegment[]> {
    return this.#api.get('empresa/segmentos');
  }
}
