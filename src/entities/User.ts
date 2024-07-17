export enum UserRole {
  root= 'root',
  system_adm= 'system_adm',
  group_adm= 'group_adm',
  user= 'user'
}

export default interface User {
  id: number;
  username: string;
  name: string;
  group_id: number;
  group: {
    id: number;
    name: string;
  };
  system_id: number;
  system: {
    id: number;
    name: string;
  };
  role: UserRole;
}

export interface pagingUser {
  page: number;
  page_size: number;
  total: number;
}