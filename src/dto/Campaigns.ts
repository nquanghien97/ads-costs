import { AdsAccountType } from "../entities/AdsAccount";

export interface CampaignsDTO {
  id: number;
  campaign_id: string;
  account_id: string;
  ad_account_id: string;
  ad_account: AdsAccountType
}

export interface CreateCampaignDTO {
  account_id: string;
  campaign_id: string;
}