export interface BankAccountType {
  id: number;
  user_id: number;
  name: string;
  card_number: string;
  bank_name: string;
  bank_id: number;
  status: string;
  group: {
    name: string
  };
  system: {
    name: string
  },
  user: {
    username: string
  }
}

export interface pagingBankAccount {
  page: number;
  page_size: number;
  total: number;
}

export enum BankAccountStatusType {
  Dang_su_dung = "Đang sử dụng",
  Ngung_su_dung = "Ngừng sử dụng",
}