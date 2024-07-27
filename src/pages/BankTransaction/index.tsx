import { useEffect, useState } from "react";
import Header from "./Header";
import PaymentDetails from "./Details/PaymentDetails";
import TableBankTransaction from "./TableBankTransaction";
import { BankTransactionsDTO } from "../../dto/BankTransactionsDTO";
import { GetBankTransactions } from "../../services/bank_transaction";
import LoadingIcon from "../../assets/icons/LoadingIcon";
import withAuth from "../../hocs/withAuth";

export interface SearchFormValues {
  search?: string;
  since?: string;
  until?: string;
  system_id?: number;
  group_id?: number;
  user_id?: number;
}

function BankTransaction() {
  const [openPaymentDetails, setOpenBankBillingDetails] = useState(false);
  const [dataBankBillings, setDataBankBillings] = useState<BankTransactionsDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchForm, setSearchForm] = useState<SearchFormValues>({
    search: '',
    since: '',
    until: '',
    system_id: 0,
    group_id: 0,
    user_id: 0
  });
  const [refreshKey, setRefreshKey] = useState(false);

  useEffect(() => {
    document.title = "Giao dịch ngân hàng"
  }, []);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const res = await GetBankTransactions(searchForm);
      setDataBankBillings(res.data.data.list);
      setLoading(false);
    })()
  }, [searchForm, refreshKey])

  return (
    <div className="px-6">
      <Header setSearchForm={setSearchForm} setRefreshKey={setRefreshKey} />
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