import api from "../config/api";

export function LoginService({ username, password } : { username: string, password: string }) {
  return api.post('/auth/login', { username: username, password: password });
}