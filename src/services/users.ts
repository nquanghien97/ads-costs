import api from "../config/api";
import { UpdateUserDTO } from "../dto/UserDTO";

export function getUsers({ page, page_size } : { page: number, page_size: number }) {
  return api.get(`/users?page=${page}&page_size=${page_size}`);
}

export function getUser(userId: number) {
  return api.get(`/users/${userId}`)
}

export function updatePassword(password_old: string, password_new: string) {
  return api.post('auth/change-password', { password_old, password_new})
}

export function UpdateUser(data: UpdateUserDTO, id: number) {
  return api.put(`/users/${id}`, data)
}