import { Skill } from '../models/skills';

export interface SkillsCandidateDto {
  id?: number;
  dominio: number;
  name?: string;
  skill?: Skill;
}
