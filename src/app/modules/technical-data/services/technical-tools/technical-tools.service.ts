import { Injectable, inject } from '@angular/core';
import { ApiService } from '../../../../core/services/api/api.service';
import { Observable } from 'rxjs';
import { Skill } from '../../models/skills';
import { AssignSkill } from '../../dtos/assign-skill.dto';

@Injectable({
  providedIn: 'root',
})
export class TechnicalToolsService {
  #api = inject(ApiService);

  getTools(): Observable<Skill[]> {
    return this.#api.get('skills/herramientas');
  }

  assignTool(skillData: AssignSkill): Observable<{ detail: string }> {
    return this.#api.post('usuario/skills', skillData);
  }
}
