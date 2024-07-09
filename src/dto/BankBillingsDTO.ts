export interface User {
  id: number;
  username: string;
  name: string;
}

export interface BankAccount {
  id: number;
  name: string;
  card_number: string;
  bank_name: string;
  status: string;
  user: User;
}

export interface DailyData {
  received: number;
  paid_bill: number;
  paid_other: number;
}

export interface TotalDailyData {
  [date: string]: DailyData;
}

export interface BankAccountData {
  bank_account_id: number;
  bank_account: BankAccount;
  total_received: number;
  total_paid_bill: number;
  total_paid_other: number;
  balance: number;
  datas: TotalDailyData;
}

export interface Group {
  name: string;
}

export interface GroupData {
  group_id: number;
  group: Group;
  bank_account_datas: BankAccountData[];
}

export interface System {
  name: string;
}

export interface ListItem {
  system_id: number;
  system: System;
  group_datas: GroupData[];
}

export interface ResponseBankBillings {
  list: ListItem[];
}