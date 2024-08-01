export interface AccountTypeData {
  group_id: number;
  type_id: number;
  type: string;
  total_ads: string;
  total_bill: string;
}

export interface ChannelData {
  group_id: number;
  channel_id: number;
  channel: string;
  total_ads: string;
  total_bill: string;
}

export interface GroupData {
  group_id: number;
  group_name: string;
  total_ads: string | number;
  total_bill: string | number;
  account_type_datas: AccountTypeData[];
  channel_datas: ChannelData[];
}