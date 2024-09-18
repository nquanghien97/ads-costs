import api from "../config/api"

export const getCampaigns = (
  { page, page_size, search, system_id, group_id, user_id, ad_account_id, bank_account_id, since, until }
  :
  { page?: number, page_size?: number, search?: string, system_id?: number, group_id?: number, user_id?: number, ad_account_id?: string, bank_account_id?: string, since?: string, until?: string }
) => {
  const params = new URLSearchParams();

  if (page) params.append('page', page.toString());
  if (page_size) params.append('page_size', page_size.toString());
  if (search) params.append('search', search.toString());
  if (system_id) params.append('system_id', system_id.toString());
  if (group_id) params.append('group_id', group_id.toString());
  if (user_id) params.append('user_id', user_id.toString());
  if (ad_account_id) params.append('ad_account_id', ad_account_id.toString());
  if (bank_account_id) params.append('bank_account_id', bank_account_id.toString());
  if (since) params.append('since', since.toString());
  if (until) params.append('until', until.toString());
  
  return api.get(`/campaigns?${params.toString()}`)
}

export const createCampaign = (data: { account_id: string, campaign_id: string }) => {
  return api.post(`/campaigns`, data)
}

export const updateCampaign = (id: number, data: { account_id?: string, campaign_id?: string }) => {
  return api.put(`/campaigns/${id}`, data)
}

export const deleteCampaign = (id: number) => {
  return api.delete(`/campaigns/${id}`)
}