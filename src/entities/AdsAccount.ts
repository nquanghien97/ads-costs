import User from "./User";

export interface BankAccount {
  id: number;
  user_id: number;
  bank_id: number;
  name: string;
  card_number: string;
  status: string;
  bank_name: string;
}

export interface AdsAccountType {
  id: number;
  user_id: number;
  account_id: string;
  account_name: string;
  ads_bill_count: number;
  ads_costs_count: number;
  channel_id: number;
  group_id: number;
  group: {
    name: string;
  }
  system_id: number;
  system: {
    name: string;
  }
  type_id: number;
  status_id: number;
  currency_id: number;
  timezone_id: number;
  rental_fee: number;
  bank_account_id: number;
  created_at: Date;
  channel: string;
  type: string;
  exchange_rate: number;
  status: string;
  currency: string;
  timezone: string;
  bank_account: BankAccount;
  user: User;
  bm_id?: string;
  bm_name?: string;
  bm_owned_by?: BmOwner
}

export interface AdsAccountList {
  list: AdsAccountType[];
}

export interface pagingAdAccount {
  page: number;
  page_size: number;
  total: number;
}

export enum BmOwner {
  DOI_TAC = "DỐI TÁC",
  PTN = "PTN"
}