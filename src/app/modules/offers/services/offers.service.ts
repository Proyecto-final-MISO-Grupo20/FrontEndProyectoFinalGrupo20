import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from '../../../core/services/api/api.service';
import { Offer } from '../models/offer';


@Injectable({
  providedIn: 'root',
})
export class OffersService {
  #api = inject(ApiService);

  getOffers() {
    return this.#api.get('ofertas/list');
  }

  createOffers(offerData: Offer): Observable<Offer> {
    return this.#api.post('oferta', offerData);
  }
}
