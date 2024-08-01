export interface UserDTO {
  name: string;
  password: string;
  password_confirm: string;
  group_id?: number;
  system_id?: number;
  role: string;
} 