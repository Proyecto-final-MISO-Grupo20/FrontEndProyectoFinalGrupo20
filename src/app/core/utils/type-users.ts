export type typeUser = {
  name: string;
  code: typeUsers;
};

export const enum typeUsers {
  candidate = 'candidate',
  business = 'business',
}

export const typeUsersData: typeUser[] = [
  { name: 'candidate', code: typeUsers.candidate },
  { name: 'business', code: typeUsers.business },
];
