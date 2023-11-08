import { Injectable, inject } from '@angular/core';
import { ApiService } from 'src/app/core/services/api/api.service';

@Injectable({
  providedIn: 'root',
})
export class TechnicalDataService {
  #api = inject(ApiService);

  getTechnicalSkillsByCandidate(userId: number) {
    return this.#api.get(`usuario/skills/${userId}`);
  }
}
