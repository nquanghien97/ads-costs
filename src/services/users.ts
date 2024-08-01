import api from "../config/api";
import { UserDTO } from "../dto/UserDTO";
import Cookies from 'js-cookie';
import { parseJwt } from "../utils/parseJwt";

export function getUsers({ page, page_size, system_id, group_id, username, name, search } : { page?: number, page_size?: number, system_id?: number, group_id?: number, username?: string, name?: string, search?: string}) {
  const params = new URLSearchParams();
  
  if (page) params.append('page', page.toString());
  if (page_size) params.append('page_size', page_size.toString());
  if (system_id) params.append('system_id', system_id.toString());
  if (group_id) params.append('group_id', group_id.toString());
  if (username) params.append('username', username);
  if (name) params.append('name', name);
  if (search) params.append('search', search);

  return api.get(`/users?${params.toString()}`);
}

export function getUsersBySystemGroup({system_id, group_id}: { system_id: number, group_id: number}) {
  return api.get(`/users?system_id=${system_id}&group_id=${group_id}`);
}

export function getUser(userId: number) {
  return api.get(`/users/${userId}`)
}

export function updatePassword({user_id, password, confirm_password} : { user_id: number, password: string, confirm_password: string }) {
  return api.post(`/users/${user_id}/change-password`, { password, confirm_password})
}

export function UpdateUser(data: UserDTO, id: number) {
  return api.put(`/users/${id}`, data)
}

export function addNewUser(data: UserDTO) {
  return api.post('/users', data)
}

export function getUserId(): number {
  const token = Cookies.get('token');

  if (!token) return -1;

  const data = parseJwt(token);
  return JSON.parse(data.data).id
}