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
    document.title = "Chi phí quảng cáo - hóa đơn"
  }, []);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const res = await GetAdsBillingsByUser({ level: "user", user_id: 7, since: "2024-07-18T06:12:12.000Z", until: "2024-07-22T10:13:24.000Z"});
      setDatas([res.data.data]);
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