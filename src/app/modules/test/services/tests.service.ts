import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from '../../../core/services/api/api.service';
import { Tests } from '../../applications/models/tests';
import { Application } from '../../applications/models/application';

@Injectable({
  providedIn: 'root',
})
export class TestsService {
  #api = inject(ApiService);

  getTests(offerId: number): Observable<Tests[]> {
    return this.#api.get(`pruebas/${offerId}/postulaciones`).pipe(
      map((offers: Application[]) => {
        return offers.map((offer) => offer.pruebas)[0] || [];
      })
    );
  }
}
