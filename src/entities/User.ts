export enum UserRole {
  ROOT= 'ROOT',
  SYSTEM_ADM= 'SYSTEM_ADM',
  GROUP_ADM= 'GROUP_ADM',
  USER= 'USER',
  ACCOUNTANT= 'ACCOUNTANT'
}

export default interface User {
  id: number;
  username: string;
  name: string;
  group_id: number;
  is_blocked: boolean;
  group: {
    id: number;
    name: string;
  };
  system_id: number;
  system: {
    id: number;
    name: string;
  };
  role: UserRole | '';
}

export interface pagingUser {
  page: number;
  page_size: number;
  total: number;
}