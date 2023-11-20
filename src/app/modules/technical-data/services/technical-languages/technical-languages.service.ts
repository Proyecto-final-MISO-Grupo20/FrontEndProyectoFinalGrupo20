import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../../core/services/api/api.service';
import { Skill } from '../../models/skills';

@Injectable({
  providedIn: 'root',
})
export class TechnicalLanguagesService {
  #api = inject(ApiService);

  getLanguages(): Observable<Skill[]> {
    return this.#api.get('skills/idiomas');
  }
}
