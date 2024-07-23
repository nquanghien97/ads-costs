import api from "../config/api";
import { BankAccountDTO } from "../dto/BankAccountDTO";

export function getListBankAccounts({ page, page_size, user_id, search, system_id, group_id } : { page?: number, page_size?: number, user_id?: number, search?: string, system_id?: string, group_id?: string}) {
  const params = new URLSearchParams();
  if(user_id) params.append('user_id', user_id.toString());
  if(page) params.append('page', page.toString());
  if(page_size) params.append('page_size', page_size.toString());
  if (search) params.append('search', search.toString());
  if(system_id) params.append('system_id', system_id.toString());
  if (group_id) params.append('group_id', group_id.toString());

  return api.get(`/bank-accounts?${params.toString()}`);
}

export function getBankAccount(id: number) {
  return api.get(`/bank-accounts/${id}`)
}

export function editBankAccount(id: number, data: BankAccountDTO) {
  return api.put(`/bank-accounts/${id}`, data)
}

export function deleteBankAccount(id: number) {
  return api.delete(`/bank-accounts/${id}`)
}

export function addBankAccount(data: BankAccountDTO) {
  return api.post('/bank-accounts', data)
}