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
  channel_id: number;
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
  user: User
}

export interface AdsAccountList {
  list: AdsAccountType[];
}

export interface pagingAdAccount {
  page: number;
  page_size: number;
  total: number;
}