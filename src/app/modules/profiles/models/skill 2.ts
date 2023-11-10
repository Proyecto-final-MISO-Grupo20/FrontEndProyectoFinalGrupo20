import { SkillType } from '../../technical-data/models/skills';

export interface Skill {
  id: number;
  nombre: string;
  tipo: SkillType;
}
