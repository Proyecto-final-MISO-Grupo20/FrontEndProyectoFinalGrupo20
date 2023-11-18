import { SkillsCandidateDto } from '../../technical-data/dtos/skills-candidate.dto';

export interface CandidatesSkills {
  id: number;
  usuario_id: number;
  fecha_nacimiento: string;
  telefono: number;
  pais: string;
  ciudad: string;
  nombre: string;
  tipo_documento: number;
  documento: string;
  email: string;
  skills: SkillsCandidateDto[];
}
