import { Injectable, inject } from '@angular/core';
import { ApiService } from '../../../../core/services/api/api.service';
import { Observable, map, shareReplay } from 'rxjs';
import { SkillsCandidateDto } from '../../dtos/skills-candidate.dto';
import { SkillType } from '../../models/skills';

@Injectable({
  providedIn: 'root',
})
export class TechnicalDataService {
  #api = inject(ApiService);

  getTechnicalSkillsByCandidate(
    skillType: SkillType
  ): Observable<SkillsCandidateDto[]> {
    return this.#api.get(`usuario/skills/1`).pipe(
      shareReplay(),
      map((skills) =>
        skills.filter(
          (skill: SkillsCandidateDto) => skill.skill.tipo === skillType
        )
      )
    );
  }
}
