import { Tests } from './tests';

export interface Application {
  id?: number;
  ofertaId: number;
  candidatoId: number;
  nombre: string;
  email: string;
  telefono: number;
  pruebas: Tests[];
}
