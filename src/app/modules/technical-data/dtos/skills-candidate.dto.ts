import { Skill } from '../models/skills';

export interface SkillsCandidateDto {
  id?: number;
  dominio: number;
  skill: Skill;
}
