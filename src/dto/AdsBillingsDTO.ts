// export interface AdsBillingsByUser {
//   user_id: number,
//   username: string,
//   name: string,
//   ad_account_datas: AdsBillingsDTO[],
// }
// export interface AdsBillingsDTO {
//   ad_account_id: number,
//   ad_account: {
//     id: number,
//     user_id: number,
//     account_id: string,
//     account_name: string,
//     channel_id: number,
//     channel: string,
//     type_id: number,
//     type: string,
//     status_id: number,
//     status: string,
//     currency_id: number,
//     currency: string,
//     exchange_rate: number,
//     timezone_id: number,
//     timezone: string,
//     rental_fee: number,
//     bank_account_id: number,
//     group_id: number,
//     group: {
//       id: number,
//       name: string,
//       system_id: number,
//     }
//     system_id: number,
//     system: {
//       name: string,
//       id: number
//     }
//     bank_account: {
//       name: string,
//       card_number: string,
//       bank_name: string,
//       status: string,
//     }
//   },
//   total_ads: number,
//   total_ads_vnd: number,
//   total_bill: number,
//   total_bill_vnd: number,
//   datas: TotalDailyData,
// }
export interface DailyAdsBillings {
  ads: number,
  ads_vnd: number,
  bill: number,
  bill_vnd: number,
  exchange_rate: number
  status: string
}

export interface TotalDailyData {
  [date: string]: DailyAdsBillings
}

export interface System {
  id: number;
  name: string;
}

export interface Group {
  id: number;
  system_id: number;
  name: string;
}

export interface BankAccountUser {
  id: number;
  system_id: number;
  group_id: number;
  username: string;
  name: string;
  role: string;
}

export interface BankAccountGroup {
  id: number;
  system_id: number;
  name: string;
}

export interface BankAccountSystem {
  id: number;
  name: string;
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
  group: BankAccountGroup;
  system_id: number;
  system: BankAccountSystem;
  user: BankAccountUser;
}

export interface AdAccountGroup {
  id: number;
  system_id: number;
  name: string;
}

export interface AdAccountSystem {
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
  bank_account_id: number;
  created_at: string;
  exchange_rate: number;
  group_id: number;
  group: AdAccountGroup;
  system_id: number;
  system: AdAccountSystem;
  channel: string;
  type: string;
  status: string;
  currency: string;
  timezone: string;
  bank_account: BankAccount;
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
  ad_account_datas: AdAccountData[];
}

export interface GroupData {
  group_id: number;
  group: Group;
  user_datas: UserData[];
}

export interface SystemData {
  system_id: number;
  system: System;
  group_datas: GroupData[];
}

export interface DataAdsBillings {
  list: SystemData[];
}
