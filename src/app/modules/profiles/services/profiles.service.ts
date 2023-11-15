import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api/api.service';
import { Skill } from '../../technical-data/models/skills';
import {
  CreateOfferDto,
  CreateOfferResponseDto,
} from '../dtos/create-offer.dto';

@Injectable({
  providedIn: 'root',
})
export class ProfilesService {
  #api = inject(ApiService);

  getTools(): Observable<Skill[]> {
    return this.#api.get('skills/herramientas');
  }

  getSkills() {
    return this.#api.get('skills/habilidades');
  }

  getLanguages() {
    return this.#api.get('skills/idiomas');
  }

  createOffer(
    projectId: number,
    offerData: CreateOfferDto
  ): Observable<CreateOfferResponseDto> {
    return this.#api.post(`offers/${projectId}`, offerData);
  }
}
