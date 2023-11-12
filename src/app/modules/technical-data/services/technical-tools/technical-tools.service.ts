import { Injectable, inject } from '@angular/core';
import { ApiService } from '../../../../core/services/api/api.service';
import { Observable } from 'rxjs';
import { Skill } from '../../models/skills';

@Injectable({
  providedIn: 'root',
})
export class TechnicalToolsService {
  #api = inject(ApiService);

  getTools(): Observable<Skill[]> {
    return this.#api.get('skills/herramientas');
  }
}
