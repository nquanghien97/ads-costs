import api from "../config/api";

export function getListBankAccounts() {
  return api.get('/bank-accounts')
}

export function getBankAccount(id: number) {
  return api.get(`/bank-accounts/${id}`)
}