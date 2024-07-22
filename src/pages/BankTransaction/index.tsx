import { useEffect, useState } from "react";
import Header from "./Header";
import PaymentDetails from "./Details/PaymentDetails";
// import TableBankTransaction from "./TableBankTransaction";
// import { BankBillings } from "../../dto/BankBillingsDTO";
import { GetBankBillings } from "../../services/bannk_billings";
import LoadingIcon from "../../assets/icons/LoadingIcon";
import withAuth from "../../hocs/withAuth";

function BankTransaction() {
  const [openPaymentDetails, setOpenBankBillingDetails] = useState(false);
  // const [dataBankBillings, setDataBankBillings] = useState<BankBillings[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Giao dịch ngân hàng"
  }, []);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const res = await GetBankBillings();
      // setDataBankBillings(res.data);
      console.log(res)
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
          // <TableBankTransaction setOpenBankBillingDetails={setOpenBankBillingDetails} datas={dataBankBillings} />
          <div>Loading...</div>
        )
      }

      {openPaymentDetails && <PaymentDetails onClose={() => setOpenBankBillingDetails(false)} />}
    </div>
  )
}

const BankTransactionWithAuth = withAuth(BankTransaction);
export default BankTransactionWithAuth;