import { useState } from "react";
import Header from "./Header";
import PaymentDetails from "./Details/PaymentDetails";

function BankTransaction() {
  const [openPaymentDetails, setOpenPaymentDetails] = useState(true);
  return (
    <div className="px-6">
      <Header />
      Giao dịch ngân hàng
      {openPaymentDetails && <PaymentDetails onClose={() => setOpenPaymentDetails(false)} />}
    </div>
  )
}

export default BankTransaction;