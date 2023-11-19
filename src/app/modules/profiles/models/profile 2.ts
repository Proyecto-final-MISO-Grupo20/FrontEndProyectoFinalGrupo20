import { AssignSkill } from '../dtos/create-offer.dto';

export interface Profile {
  id: number;
  perfil: string;
  proyecto_id: number;
  estado: string;
  skills: AssignSkill[];
}
