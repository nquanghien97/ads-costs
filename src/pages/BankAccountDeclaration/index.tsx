import withAuth from "../../hocs/withAuth";
import Header from "./Header";
import Table from "./TableBankAccount";

function BankAccountDeclaration() {
  return (
    <div className="px-4">
      <Header />
      <Table />
    </div>
  )
}

const BankAccountDeclarationWithAuth = withAuth(BankAccountDeclaration);

export default BankAccountDeclarationWithAuth;