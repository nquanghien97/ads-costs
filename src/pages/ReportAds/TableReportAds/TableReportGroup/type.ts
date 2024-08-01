export interface AccountTypeData {
  user_id: number;
  type_id: number;
  type: string;
  total_ads: string;
  total_bill: string;
}

export interface ChannelData {
  user_id: number;
  channel_id: number;
  channel: string;
  total_ads: string;
  total_bill: string;
}

export interface UserData {
  user_id: number;
  name: string;
  username: string;
  total_ads: string | number;
  total_bill: string | number;
  account_type_datas: AccountTypeData[];
  channel_datas: ChannelData[];
}