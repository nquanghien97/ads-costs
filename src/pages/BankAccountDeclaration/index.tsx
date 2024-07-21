import { useState } from "react";
import { BankAccountType } from "../../entities/BankAccount";
import withAuth from "../../hocs/withAuth";
import Header from "./Header";
import Table from "./TableBankAccount";

function BankAccountDeclaration() {
  const [data, setData] = useState<BankAccountType[]>([]);
  const [loading, setLoading] = useState(false);
  return (
    <div className="px-4">
      <Header setData={setData} setLoading={setLoading} />
      <Table data={data} setData={setData} loading={loading} setLoading={setLoading} />
    </div>
  )
}

const BankAccountDeclarationWithAuth = withAuth(BankAccountDeclaration);

export default BankAccountDeclarationWithAuth;