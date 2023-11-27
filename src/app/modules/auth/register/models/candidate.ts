import { Skill } from '../../../technical-data/models/skills';

export interface Candidate {
  nombre: string;
  tipoDocumento: number;
  documento: string;
  username: string;
  password: string;
  email: string;
  fechaNacimiento: Date;
  telefono: number;
  pais: string;
  skills?: Skill;
}
