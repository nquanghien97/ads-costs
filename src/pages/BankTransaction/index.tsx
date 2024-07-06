import { useEffect, useState } from "react";
import Header from "./Header";
import PaymentDetails from "./Details/PaymentDetails";
import TableBankTransaction from "./TableBankTransaction";
import { ResponseBankBillings } from "../../dto/BankBillingsDTO";
import { GetBankBillings } from "../../services/bannk_billings";
import LoadingIcon from "../../assets/icons/LoadingIcon";

function BankTransaction() {
  const [openPaymentDetails, setOpenPaymentDetails] = useState(false);
  const [dataBankBillings, setDataBankBillings] = useState<ResponseBankBillings[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const res = await GetBankBillings();
      setDataBankBillings(res.data);
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
          <>
            {dataBankBillings.map((data) => (
              <div key={data.id}>
                  {data.list.map((smallData) => (
                    <TableBankTransaction setOpenPaymentDetails={setOpenPaymentDetails} datas={smallData} />
                  ))}
            </div>
            ))}
          </>
        )
      }

      {openPaymentDetails && <PaymentDetails onClose={() => setOpenPaymentDetails(false)} />}
    </div>
  )
}

export default BankTransaction;