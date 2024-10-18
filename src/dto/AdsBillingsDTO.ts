export interface Group {
  id: number;
  system_id: number;
  name: string;
}

export interface System {
  id: number;
  name: string;
}

export interface AdAccount {
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
  bank_account_id: number | null;
  created_at: string;
  exchange_rate: number;
  bm_id: string;
  bm_name: string;
  bm_owned_by: string;
  group_id: number;
  group: Group;
  system_id: number;
  system: System;
  channel: string;
  type: string;
  status: string;
  currency: string;
  timezone: string;
  bank_account: BankAccount;
  ads_bill_count: number;
  ads_costs_count: number;
}

export interface BankAccount {
  id: number;
  user_id: number;
  bank_id: number;
  name: string;
  card_number: string;
  status: string;
  bank_name: string;
  group_id: number;
  group: Group;
  system_id: number;
  system: System;
  user: User;
}

interface User {
  id: number;
  system_id: number;
  group_id: number;
  username: string;
  name: string;
  role: string;
  is_blocked: boolean;
}

export interface DailyAdsBillings {
  id: number;
  ads: number,
  ads_vnd: number,
  bill: number,
  bill_vnd: number,
  exchange_rate: number,
  status: string,
  bill_status: string
}

export interface TotalDailyData {
  [date: string]: DailyAdsBillings
}

export interface AdAccountData {
  ad_account_id: number;
  ad_account: AdAccount;
  total_ads: number;
  total_ads_vnd: number;
  total_bill: number;
  total_bill_vnd: number;
  datas: TotalDailyData
}

export interface UserData {
  user_id: number;
  name: string;
  username: string;
  group_id: number;
  group: Group;
  system_id: number;
  system: System;
  ad_account_datas: AdAccountData[];
}

