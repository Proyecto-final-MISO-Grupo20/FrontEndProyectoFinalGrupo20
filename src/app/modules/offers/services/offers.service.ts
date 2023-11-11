import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from '../../../core/services/api/api.service';
import { Offer } from '../models/offer';
import { mockData_offers } from '../utils/mock-data-offers';


@Injectable({
  providedIn: 'root',
})
export class OffersService {
  #api = inject(ApiService);

  getOffers() {
    return of(mockData_offers);
  }

  createOffers(offerData: Offer): Observable<Offer> {
    return this.#api.post('oferta', offerData);
  }
}
