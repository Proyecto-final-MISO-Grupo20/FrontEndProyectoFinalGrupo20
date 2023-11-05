import { Injectable, inject } from '@angular/core';
import { ApiService } from '../../../../core/services/api/api.service';

@Injectable({
  providedIn: 'root',
})
export class TechnicalHabilitiesService {
  #api = inject(ApiService);

  // getTechnicalHabilities() {

  // }
}
