import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api/api.service';
import { Skill } from '../../technical-data/models/skills';

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
}
