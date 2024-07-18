import api from "../config/api";
import { UserDTO } from "../dto/UserDTO";
import Cookies from 'js-cookie';
import { parseJwt } from "../utils/parseJwt";

export function getUsers({ page, page_size } : { page: number, page_size: number }) {
  return api.get(`/users?page=${page}&page_size=${page_size}`);
}

export function getUser(userId: number) {
  return api.get(`/users/${userId}`)
}

export function updatePassword(password_old: string, password_new: string) {
  return api.post('auth/change-password', { password_old, password_new})
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