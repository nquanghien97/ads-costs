import api from "../config/api";
import Cookies from 'js-cookie';

export function LoginService({ username, password } : { username: string, password: string }) {
  return api.post('/auth/login', { username: username, password: password });
}

export function LogOut() {
  Cookies.remove('token');
  window.location.href = '/login'
}

export function ChangePassword({password_old, password_new}: { password_old: string, password_new: string}){
  return api.post('/auth/change-password', { password_old, password_new})
}