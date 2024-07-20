import api from "../config/api";
import { BankAccountDTO } from "../dto/BankAccountDTO";

export function getListBankAccounts({ page, page_size } : { page: number, page_size: number}) {
  return api.get(`/bank-accounts?page=${page}&page_size=${page_size}`)
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