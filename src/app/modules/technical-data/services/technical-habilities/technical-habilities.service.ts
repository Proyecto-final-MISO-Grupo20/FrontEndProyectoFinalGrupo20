import { Injectable, inject } from '@angular/core';
import { ApiService } from '../../../../core/services/api/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TechnicalHabilitiesService {
  #api = inject(ApiService);

  getHabilities(): Observable<any> {
    return this.#api.get('skills/habilidades');
  }
}
