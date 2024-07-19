import api from "../config/api";

export function getListBankAccounts() {
  return api.get('/bank-accounts')
}