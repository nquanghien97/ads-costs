import api from "../config/api";

export function getAllSystems() {
  return api.get('/systems');
}