import { useEffect, useState } from "react";
import Header from "./Header";
import PaymentDetails from "./Details/PaymentDetails";
import TableBankTransaction from "./TableBankTransaction";
import { BankTransactionsDTO } from "../../dto/BankTransactionsDTO";
import { GetBankTransactions } from "../../services/bank_transaction";
import LoadingIcon from "../../assets/icons/LoadingIcon";
import withAuth from "../../hocs/withAuth";

function BankTransaction() {
  const [openPaymentDetails, setOpenBankBillingDetails] = useState(false);
  const [dataBankBillings, setDataBankBillings] = useState<BankTransactionsDTO[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Giao dịch ngân hàng"
  }, []);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const res = await GetBankTransactions({});
      setDataBankBillings(res.data.data.list);
      setLoading(false);
    })()
  }, [])

  return (
    <div className="px-6">
      <Header />
      {
        loading ? (
          <div className="flex justify-center">
            <LoadingIcon />
          </div>
        ) : (
            <TableBankTransaction setOpenBankBillingDetails={setOpenBankBillingDetails} datas={dataBankBillings} />
        )
      }

      {openPaymentDetails && <PaymentDetails onClose={() => setOpenBankBillingDetails(false)} />}
    </div>
  )
}

const BankTransactionWithAuth = withAuth(BankTransaction);
export default BankTransactionWithAuth;