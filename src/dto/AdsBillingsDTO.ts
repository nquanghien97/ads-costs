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
  datas: AdsBillingsByDate[],
}

export interface AdsBillingsByDate {
  id: string,
  time: string,
  ads: number,
  ads_vnd: number,
  bill: number,
  bill_vnd: number,
  exchange_rate: number
  status: string
}

export interface AdsBillingsByUserDTO {
  user_id: number,
  username: string,
  name: string,
  list: AdsBillingsDTO[],
}