export interface AdsBillingsByUser {
  user_id: number,
  username: string,
  name: string,
  list: AdsBillingsDTO[],
}
export interface AdsBillingsDTO {
  ad_account_id: number,
  ad_account: {
    id: number,
    user_id: number,
    account_id: string,
    account_name: string,
    channel_id: number,
    channel: string,
    type_id: number,
    type: string,
    status_id: number,
    status: string,
    currency_id: number,
    currency: string,
    exchange_rate: number,
    timezone_id: number,
    timezone: string,
    rental_fee: number,
    bank_account_id: number,
    group_id: number,
    group: {
      id: number,
      name: string,
      system_id: number,
    }
    system_id: number,
    system: {
      name: string,
      id: number
    }
    bank_account: {
      name: string,
      card_number: string,
      bank_name: string,
      status: string,
    }
  },
  total_ads: number,
  total_ads_vnd: number,
  total_bill: number,
  total_bill_vnd: number,
  datas: TotalDailyData,
}
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

