import api from "../config/api"
import { AdsBillDetails, DeclarationAdsBillsDTO } from "../dto/AdsBillingsDTO";

export const DeclarationAdsBills = (data: DeclarationAdsBillsDTO[]) => {
  return api.post('/bulk-ads-bills', {data})
}

export const getAdsBillDetails = ({ search, system_id, group_id, user_id, ad_account_id, bank_account_id, since, until } : AdsBillDetails) => {
  const params = new URLSearchParams();

  if (search) params.append('search', search.toString());
  if (system_id) params.append('system_id', system_id.toString());
  if (group_id) params.append('group_id', group_id.toString());
  if (user_id) params.append('user_id', user_id.toString());
  if (ad_account_id) params.append('ad_account_id', ad_account_id.toString());
  if (bank_account_id) params.append('bank_account_id', bank_account_id.toString());
  if (since) params.append('since', since.toString());
  if (until) params.append('until', until.toString());
  
  return api.get(`/ads-bills?${params.toString()}`)
}