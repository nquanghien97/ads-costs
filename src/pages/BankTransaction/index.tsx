import { useState } from "react";
import Header from "./Header";
import PaymentDetails from "./Details/PaymentDetails";
import TableBankTransaction from "./TableBankTransaction";

function BankTransaction() {
  const [openPaymentDetails, setOpenPaymentDetails] = useState(false);
  return (
    <div className="px-6">
      <Header />
      <TableBankTransaction />
      {openPaymentDetails && <PaymentDetails onClose={() => setOpenPaymentDetails(false)} />}
    </div>
  )
}

export default BankTransaction;