export interface ResponseBankBillings {
  list: BankBillingsDTO[],
  id: string,
}

export interface BankBillingsDTO {
  system_id: number,
  system: {
    name: string,
  },
  group_datas: [
    {
      group_id: string,
      group: {
        name: string,
      },
      bank_account_datas: [
        {
          bank_account_id: string,
          bank_account: {
            id: number,
            name: string,
            card_number: string,
            bank_name: string,
            status: string,
            user: {
              id: number,
              username: string,
              name: string
            }
          },
          total_ads: number,
          total_ads_vnd: number,
          total_bill: number,
          total_bill_vnd: number,
          datas: BankBillingsByDate[]
        }
      ]
    }
  ]
}

export interface BankBillingsByDate {
  id: string;
  time: string,
  ads: number,
  ads_vnd: number,
  bill: number,
  bill_vnd: number,
  exchange_rate: number
}