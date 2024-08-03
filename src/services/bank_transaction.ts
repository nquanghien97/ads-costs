import api from "../config/api"
import { BankCostsDTO } from "../dto/BankTransactionsDTO";

export const GetBankTransactions = ({ user_id, search, since, until, system_id, group_id } : { user_id?: number, search?: string, since?: string, until?: string, system_id?: number, group_id?: number}) => {
  const params = new URLSearchParams();
  
  if (user_id) params.append('user_id', user_id.toString());
  if(search) params.append('search', search.toString());
  if (since) params.append('since', since.toString());
  if (until) params.append('until', until.toString());
  if (group_id) params.append('group_id', group_id.toString());
  if(system_id) params.append('system_id', system_id.toString());

  return api.get(`/statistics/bank?${params.toString()}`);
}

export const BankCostsDeclaration = (data: BankCostsDTO[]) => {
  return api.post(`/bulk-bank-costs`, { data })
}

export const getBankBillDetails = ({ since, until, bank_account_id, type } : { since: string, until: string, bank_account_id: number, type: string }) => {
  const params = new URLSearchParams();

  if (since) params.append('since', since.toString());
  if (until) params.append('until', until.toString());
  if (bank_account_id) params.append('bank_account_id', bank_account_id.toString());
  if (type) params.append('type', type.toString());

  return api.get(`/bank-costs?${params.toString()}`);
}