export interface BankBillingsResponse {
  list: BankBillings[];
}

export interface BankBillings {
  system_id: number;
  system: {
    name: string;
  };
  group_datas: {
    group_id: number;
    group: {
      name: string;
    };
    bank_account_datas: {
      bank_account_id: number;
      bank_account: {
        id: number;
        name: string;
        card_number: string;
        bank_name: string;
        status: string;
        user: {
          id: number;
          username: string;
          name: string;
        };
      };
      total_received: number;
      total_paid_bill: number;
      total_paid_other: number;
      balance: number;
      datas: TotalDailyData;
    }[];
  }[];
}

export interface DailyData {
  received: number;
  paid_bill: number;
  paid_other: number;
}

export interface TotalDailyData {
  [date: string]: DailyData;
}


