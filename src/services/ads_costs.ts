import api from "../config/api"
import { DeclarationAdsCostsDTO } from "../dto/AdsBillingsDTO";

export const GetAdsCostsByUser = (
    { page, page_size, search, since, until, system_id, group_id, user_id, channel_id }
    :
    { page?: number, page_size?: number, search?: string, since?: string, until?: string, system_id?: number, group_id?: number, user_id?: number, channel_id?: number }
  ) => {
  const params = new URLSearchParams();
  
  if (page) params.append('page', page.toString());
  if (page_size) params.append('page_size', page_size.toString());
  if (search) params.append('search', search.toString());
  if (since) params.append('since', since.toString());
  if (until) params.append('until', until.toString());
  if(system_id) params.append('system_id', system_id.toString());
  if (group_id) params.append('group_id', group_id.toString());
  if (user_id) params.append('user_id', user_id.toString());
  if (channel_id) params.append('channel_id', channel_id.toString());

  return api.get(`/statistics/ads?level=user&${params.toString()}`);
}

export const DeclarationAdsCosts = (data: DeclarationAdsCostsDTO[]) => {
  return api.post('/bulk-ads-costs', { data })
}

export const getAdsCostsBySystem = ({ system_id, since, until } : { system_id: number, since?: string, until?: string }) => {
  const params = new URLSearchParams();
  if (system_id) params.append('system_id', system_id.toString());
  if (since) params.append('since', since.toString());
  if (until) params.append('until', until.toString());

  return api.get(`/statistics/ads?level=system&${params.toString()}`)
}

export const getAdsCostsByGroup = ({ group_id, since, until } : { group_id: number, since?: string, until?: string }) => {
  const params = new URLSearchParams();
  if (group_id) params.append('group_id', group_id.toString());
  if (since) params.append('since', since.toString());
  if (until) params.append('until', until.toString());

  return api.get(`/statistics/ads?level=group&${params.toString()}`)
}