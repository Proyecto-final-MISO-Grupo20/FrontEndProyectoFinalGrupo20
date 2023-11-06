export enum SkillType {
  HABILIDAD = 'HABILIDAD',
  HERRAMIENTA = 'HERRAMIENTA',
  IDIOMA = 'IDIOMA',
}

export interface Skill {
  id: number;
  tipo: SkillType;
  nombre: string;
}
