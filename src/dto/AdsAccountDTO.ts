export interface EditAdsAccountDTO {
  account_id: number,
  account_name: string,
  channel_id: number,
  type_id: number,
  currency_id: number,
  timezone_id: number,
  bank_account_id: number,
  status_id: number
}

export interface AddNewAdAccountDTO {
  user_id: number,
  account_id: number,
  account_name: string,
  channel_id: number,
  type_id: number,
  currency_id: number,
  timezone_id: number,
  bank_account_id?: number,
  exchange_rate?: number,
  rental_fee?: number,
  status_id: number
}
