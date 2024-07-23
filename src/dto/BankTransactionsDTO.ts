// export interface BankBillingsResponse {
//   list: BankTransactionsDTO[];
// }

// export interface BankTransactionsDTO {
//   system_id: number;
//   system: {
//     name: string;
//   };
//   group_datas: {
//     group_id: number;
//     group: {
//       name: string;
//     };
//     bank_account_datas: {
//       bank_account_id: number;
//       bank_account: {
//         id: number;
//         name: string;
//         card_number: string;
//         bank_name: string;
//         status: string;
//         user: {
//           id: number;
//           username: string;
//           name: string;
//         };
//       };
//       total_received: number;
//       total_paid_bill: number;
//       total_paid_other: number;
//       balance: number;
//       datas: TotalDailyData;
//     }[];
//   }[];
// }

export interface DailyData {
  received: number;
  paid_bill: number;
  paid_other: number;
}

export interface TotalDailyData {
  [date: string]: DailyData;
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
  system_id: number;
}

export interface BankAccountData {
  bank_account_id: number;
  bank_account: BankAccount;
  total_received: number;
  total_paid_bill: number;
  total_paid_other: number;
  balance: number;
  datas: TotalDailyData
}

export interface Group {
  id: number;
  system_id: number;
  name: string;
}

export interface GroupData {
  group_id: number;
  group: Group;
  bank_account_datas: BankAccountData[];
}

export interface System {
  id: number;
  name: string;
}

export interface BankTransactionsDTO {
  system_id: number;
  system: System;
  group_datas: GroupData[];
}

export interface BankTransactionsResponse {
  list: BankTransactionsDTO[];
}


