import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Offer } from '../../../../core/models/offer.model';
import { ApiService } from '../../../../core/services/api/api.service';
import { AssignCandidateToOffer } from '../../dtos/assign-candidate-offer';

@Injectable({
  providedIn: 'root',
})
export class CandidateHomeService {
  #api = inject(ApiService);

  getOffers(): Observable<Offer[]> {
    return this.#api.get('offers');
  }

  assignCandidateToOffer(offerData: AssignCandidateToOffer): Observable<any> {
    return this.#api.post('pruebas/candidato', offerData);
  }
}
