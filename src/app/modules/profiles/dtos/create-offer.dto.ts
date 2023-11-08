export interface AssignSkill {
  skill_id: number;
  dominio: number;
  skillName?: string;
}

export interface CreateOfferDto {
  perfil: string;
  skills: AssignSkill[];
}

export interface CreateOfferResponseDto {
  id: number;
  perfil: string;
  proyecto_id: number;
  estado: string;
  skills: AssignSkill[];
}
