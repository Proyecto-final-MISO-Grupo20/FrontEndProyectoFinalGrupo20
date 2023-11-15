import { Injectable, inject } from '@angular/core';
import {
  Observable,
  catchError,
  concatMap,
  forkJoin,
  mergeMap,
  of,
  shareReplay,
} from 'rxjs';
import { ApiService } from '../../../core/services/api/api.service';
import { Offer } from '../models/offer';
import { mockData_offers } from '../utils/mock-data-offers';

@Injectable({
  providedIn: 'root',
})
export class OffersService {
  #api = inject(ApiService);

  getOffers(projectId: number): Observable<Offer[]> {
    return this.#api.get(`offers/${projectId}`).pipe(
      shareReplay(),
      concatMap((offers: Offer[]) => {
        const postulationsData = offers.map((offer: Offer) =>
          this.#api.get(`pruebas/${offer.id}/postulaciones`).pipe(
            catchError((error: any) => {
              console.error(
                `Error fetching postulations for offer ${offer.id}`,
                error
              );
              return of([]);
            })
          )
        );

        return forkJoin(postulationsData).pipe(
          mergeMap((postulations: any[]) => {
            const mergedOffers = offers.map((offer, index) => ({
              ...offer,
              postulations: postulations[index],
            }));

            return of(mergedOffers);
          })
        );
      })
    );
  }

  createOffers(offerData: Offer): Observable<Offer> {
    return this.#api.post('offers', offerData);
  }

  getPostulationsByOffer(offerId: number) {
    return this.#api.get(`pruebas/${offerId}/postulaciones`);
  }
}
