import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mockData_tools } from '../utils/mock-data_tools';
import { mockData_skills } from '../utils/mock-data_skills';
import { mockData_languages } from '../utils/mock-data_ language';
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
