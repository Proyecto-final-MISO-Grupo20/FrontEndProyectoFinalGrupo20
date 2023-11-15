import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api/api.service';
import { Tests } from '../models/tests';

@Injectable({
  providedIn: 'root',
})
export class ApplicationsService {
  #api = inject(ApiService);

  getApplications(offerId: number): Observable<Tests[]> {
    return this.#api.get(`pruebas/${offerId}/postulaciones`);
  }
}
