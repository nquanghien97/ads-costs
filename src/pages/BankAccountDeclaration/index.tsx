import { useEffect, useState } from "react";
import { BankAccountType } from "../../entities/BankAccount";
import withAuth from "../../hocs/withAuth";
import Header from "./Header";
import Table from "./TableBankAccount";

export interface FormSearchValueType {
  page?: number;
  page_size?: number;
  system_id?: number;
  group_id?: number;
  user_id?: number;
  search?: string;
}

function BankAccountDeclaration() {
  const [data, setData] = useState<BankAccountType[]>([]);
  const [loading, setLoading] = useState(false);
  const [formSearchValue, setFormSearchValue] = useState<FormSearchValueType>()

  useEffect(() => {
    document.title = "Khai báo tài khoản ngân hàng"
  }, []);
  
  return (
    <div className="px-4">
      <Header setLoading={setLoading} setFormSearchValue={setFormSearchValue} />
      <Table data={data} setData={setData} loading={loading} setLoading={setLoading} formSearchValue={formSearchValue} />
    </div>
  )
}

const BankAccountDeclarationWithAuth = withAuth(BankAccountDeclaration);

export default BankAccountDeclarationWithAuth;