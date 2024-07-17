import { parseJwt } from './parseJwt';
import Cookies from 'js-cookie';


export const isAuthenticated = () => {
  const token = Cookies.get('token');

  if (!token) return false;

  const data = parseJwt(token);
  return !!data;
};