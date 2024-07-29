export interface ExchangeRateType {
  id: number;
  date: string;
  bank_id: number;
  currency_id: number;
  rate: number;
  created_at: string;
  bank: string;
  currency: string;
}