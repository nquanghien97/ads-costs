import api from "../config/api";
import { BankAccountDTO } from "../dto/BankAccountDTO";

export function getListBankAccounts() {
  return api.get('/bank-accounts')
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