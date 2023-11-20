import { Injectable, inject } from '@angular/core';
import { ApiService } from '../../../../core/services/api/api.service';
import { Observable, map, shareReplay } from 'rxjs';
import { SkillsCandidateDto } from '../../dtos/skills-candidate.dto';
import { SkillType } from '../../models/skills';
import { AssignSkill } from '../../dtos/assign-skill.dto';

@Injectable({
  providedIn: 'root',
})
export class TechnicalDataService {
  #api = inject(ApiService);

  getTechnicalSkillsByCandidate(
    skillType: SkillType
  ): Observable<SkillsCandidateDto[]> {
    return this.#api.get(`usuario/skills`).pipe(
      shareReplay(),
      map((skills) =>
        skills
          .filter(
            (skill: SkillsCandidateDto) => skill?.skill?.tipo === skillType
          )
          .map((skill: SkillsCandidateDto) => {
            return {
              id: skill.id,
              name: skill?.skill?.nombre,
              dominio: skill.dominio,
            };
          })
      )
    );
  }

  assignSkill(skillData: AssignSkill): Observable<{ detail: string }> {
    return this.#api.post('usuario/skills', skillData);
  }
}
