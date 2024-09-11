import api from "../config/api";

//channels
export function getAllChannels() {
  return api.get('/setting/channels')
}

export function addChannel(name: string) {
  return api.post('/setting/channels', { name })
}

export function editChannel({ id, name}: { id: number, name: string }) {
  return api.put(`/setting/channels/${id}`, { name })
}

export function deleteChannel(id: number) {
  return api.delete(`/setting/channels/${id}`)
}

//currencies
export function getAllCurrencies() {
  return api.get('/setting/currencies')
}

export function addCurrency(name: string) {
  return api.post('/setting/currencies', { name })
}

export function editCurrency({ id, name}: { id: number, name: string }) {
  return api.put(`/setting/currencies/${id}`, { name })
}

export function deleteCurrency(id: number) {
  return api.delete(`/setting/currencies/${id}`)
}

//timezones
export function getAllTimezones() {
  return api.get('/setting/timezones')
}

export function addTimezone(name: string) {
  return api.post('/setting/timezones', { name })
}

export function editTimezone({ id, name}: { id: number, name: string }) {
  return api.put(`/setting/timezones/${id}`, {name})
}

export function deleteTimezone(id: number) {
  return api.delete(`/setting/timezones/${id}`)
}

//ad_account_types
export function getAllAdAccountTypes() {
  return api.get('/setting/ad-account-types')
}

export function addAdAccountType(name: string) {
  return api.post('/setting/ad-account-types', { name })
}

export function editAdAccountType({ id, name}: { id: number, name: string }) {
  return api.put(`/setting/ad-account-types/${id}`, { name })
}

export function deleteAdAccountType(id: number) {
  return api.delete(`/setting/ad-account-types/${id}`)
}

//ad_account_status
export function getAllAdAccountStatus() {
  return api.get('/setting/ad-account-statuses')
}

export function addAdAccountStatus(name: string) {
  return api.post('/setting/ad-account-statuses', { name })
}

export function editAdAccountStatus({ id, name}: { id: number, name: string }) {
  return api.put(`/setting/ad-account-status/${id}`, { name })
}

export function deleteAdAccountStatus(id: number) {
  return api.delete(`/setting/ad-account-statuses/${id}`)
}

//banks
export function getAllBanks() {
  return api.get('/setting/banks')
}

export function addBank(name: string) {
  return api.post('/setting/banks', { name })
}

export function editBank({ id, name}: { id: number, name: string }) {
  return api.put(`/setting/banks/${id}`, {name})
}

export function deleteBank(id: number) {
  return api.delete(`/setting/banks/${id}`)
}

//sheetIds
export function getAllSheetIds() {
  return api.get('/setting/sheets')
}

export function addSheetId(name: string) {
  return api.post('/setting/sheets', { name })
}

export function editSheetId({ id, name}: { id: number, name: string }) {
  return api.put(`/setting/sheets/${id}`, { name })
}

export function deleteSheetId(id: number) {
  return api.delete(`/setting/sheets/${id}`)
}