import api from "../config/api";

export function getGroups() {
  return api.get('/groups');
}

export function getGroupsBySystemId(system_id: number) {
  return api.get(`/groups?system_id=${system_id}`)
}

export function addGroup(name: string, system_id: number) {
  return api.post('/groups', { name, system_id })
}

export function getGroup(id: number) {
  return api.get(`/groups/${id}`)
}

export function editGroup({id, name}: { id: number, name: string }){
  return api.put(`/groups/${id}`, { name })
}

export function deleteGroup(id: number) {
  return api.delete(`/groups/${id}`)
}