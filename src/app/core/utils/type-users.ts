export type typeUser = {
  name: string;
  code: typeUsers;
};

export const enum typeUsers {
  candidate = 'candidate',
  business = 'business',
}

export const typeUsersData: typeUser[] = [
  { name: 'Candidato', code: typeUsers.candidate },
  { name: 'Empresa', code: typeUsers.business },
];
