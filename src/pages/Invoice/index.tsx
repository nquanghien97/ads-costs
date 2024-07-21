import { useEffect, useState } from "react";
import HeaderInvoice from "./HeaderInvoice";
import InvoiceDetails from "./InvoiceDetails";
import TableInvoice from "./TableInvoice";
import TableInvoiceRent from "./TableInvoiceRent";
import { GetAdsBillingsByUser } from "../../services/ads_billings";
import { AdsBillingsByUser } from "../../dto/AdsBillingsDTO";
import withAuth from "../../hocs/withAuth";

function Invoice() {
  const [openInvoiceDetails, setOpenInvoiceDetails] = useState(false);
  const [datas, setDatas] = useState<AdsBillingsByUser[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    (async () => {
      const res = await GetAdsBillingsByUser();
      setDatas(res.data);
      setLoading(false);
    })()
  }, []);

  return (
    <div className="px-4">
      <HeaderInvoice />
      <div className="pt-[136px]">
        {datas.map((data) => (
          <div className="border-b-4 border-cyan-700 py-6" key={data.user_id}>
            <TableInvoice setOpenInvoiceDetails={setOpenInvoiceDetails} data={data} loading={loading} />
            <TableInvoiceRent setOpenInvoiceDetails={setOpenInvoiceDetails} data={data} loading={loading} />
          </div>
        ))}
      </div>
      {openInvoiceDetails && <InvoiceDetails onClose={() => setOpenInvoiceDetails(false)} />}
    </div>
  )
}

const InvoiceWithAuth = withAuth(Invoice)

export default InvoiceWithAuth;