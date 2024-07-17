import api from "../config/api";

export function getAllGroups() {
  return api.get('/groups');
}

export function addGroup(name: string) {
  return api.post('/groups', { name })
}

export function getGroup(id: number) {
  return api.get(`/groups/${id}`)
}

export function editGroup({id, name}: { id: number, name: string }){
  return api.put(`/groups/${id}`, name)
}

export function deleteGroup(id: number) {
  return api.delete(`/groups/${id}`)
}