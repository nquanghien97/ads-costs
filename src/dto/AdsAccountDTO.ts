import { BmOwner } from "../entities/AdsAccount"

export interface EditAdsAccountDTO {
  account_id: number,
  account_name: string,
  channel_id: number,
  type_id: number,
  currency_id: number,
  timezone_id: number,
  bank_account_id?: number,
  status_id?: number,
  bm_id?: string,
  bm_name?: string,
  bm_owned_by?: BmOwner
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
