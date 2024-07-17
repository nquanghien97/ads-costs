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
  exchange_rate: number;
  timezone_id: number;
  rental_fee: number;
  bank_account_id: number;
  channel: string;
  type: string;
  status: string;
  currency: string;
  timezone: string;
  bank_account: BankAccount;
}

export interface AdsAccountList {
  list: AdsAccountType[];
}