import api from "../config/api";

export const GetAdsCostsCampaigns = (
  { page, page_size, search, since, until, system_id, group_id, user_id, channel_id, status }
  :
  { page?: number, page_size?: number, search?: string, since?: string, until?: string, system_id?: number, group_id?: number, user_id?: number, channel_id?: number, status?: string}
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
if (status) params.append('status', status.toString());

return api.get(`/statistics/campaigns?${params.toString()}`);
}

export const UpdateStatusCampaign = (id: number, status: string) => {
  return api.post(`/statistics/campaigns/${id}`, { status })
}
