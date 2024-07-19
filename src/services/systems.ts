import api from "../config/api";

export function getAllSystems() {
  return api.get('/systems');
}

export function addSystem(name: string) {
  return api.post('/systems', { name })
}

export function getSystem(id: number) {
  return api.get(`/systems/${id}`)
}

export function editSystem({id, name}: { id: number, name: string }){
  return api.put(`/systems/${id}`, { name })
}

export function deleteSystem(id: number) {
  return api.delete(`/systems/${id}`)
}