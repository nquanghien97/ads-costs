import api from "../config/api"
import { DeclarationAdsCostsDTO } from "../dto/AdsBillingsDTO";

export const GetAdsCostsByUser = ({ search, since, until, system_id, group_id } : { search?: string, since?: string, until?: string, system_id?: number, group_id?: number}) => {
  const params = new URLSearchParams();
  
  if (search) params.append('search', search.toString());
  if (since) params.append('since', since.toString());
  if (until) params.append('until', until.toString());
  if(system_id) params.append('system_id', system_id.toString());
  if (group_id) params.append('group_id', group_id.toString());

  return api.get(`/statistics/ads?level=user${params.toString()}`);
}

export const DeclarationAdsCosts = (data: DeclarationAdsCostsDTO[]) => {
  return api.post('/bulk-ads-costs', data)
}