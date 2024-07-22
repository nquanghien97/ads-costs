import api from "../config/api"

export const GetAdsBillingsByUser = ({ user_id, since, until, system_id, group_id } : { user_id?: number, since?: string, until?: string, system_id?: number, group_id?: number}) => {
  const params = new URLSearchParams();
  
  if (user_id) params.append('user_id', user_id.toString());
  if (since) params.append('since', since.toString());
  if (until) params.append('until', until.toString());
  if(system_id) params.append('system_id', system_id.toString());
  if (group_id) params.append('group_id', group_id.toString());

  return api.get(`/statistics/ads?level=user${params.toString()}`);
}
