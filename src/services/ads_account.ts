import api from "../config/api"
import { AddNewAdAccountDTO, EditAdsAccountDTO } from "../dto/AdsAccountDTO"

export const getListAdsAccount = (
  { page, page_size, system_id, group_id, name, search, channel_id, since, until }
    : 
  { page?: number, page_size?: number, system_id?: number, group_id?: number, name?: string, search?: string, channel_id?: number, since?: string, until?: string}
  ) => {
  const params = new URLSearchParams();
  
  if (page) params.append('page', page.toString());
  if (page_size) params.append('page_size', page_size.toString());
  if (system_id) params.append('system_id', system_id.toString());
  if (group_id) params.append('group_id', group_id.toString());
  if (name) params.append('name', name);
  if (search) params.append('search', search);
  if (channel_id) params.append('channel_id', channel_id.toString());
  if (since) params.append('since', since.toString());
  if (until) params.append('until', until.toString())

  return api.get(`/ad-accounts?order_by=created_at&order=DESC&${params.toString()}`)
}

export const editAdsAccount = (id: number, data: EditAdsAccountDTO) => {
  return api.put(`/ad-accounts/${id}`, data)
}

export const getAdsAccount = (id: number) => {
  return api.get(`/ad-accounts/${id}`)
}

export const addNewAdAccount = (data: AddNewAdAccountDTO) => {
  return api.post('ad-accounts', data)
}

export const deleteAdAccount = (id: number) => {
  return api.delete(`ad-accounts/${id}`)
}