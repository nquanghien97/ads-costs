export interface BankAccountType {
  id: number;
  user_id: number;
  name: string;
  card_number: string;
  bank_name: string;
  bank_id: number;
  status: string;
}

export interface pagingBankAccount {
  page: number;
  page_size: number;
  total: number;
}