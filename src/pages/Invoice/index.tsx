import { useEffect, useState } from "react";
import HeaderInvoice from "./HeaderInvoice";
import InvoiceDetails from "./InvoiceDetails";
import TableInvoice from "./TableInvoice";
import TableInvoiceRent from "./TableInvoiceRent";
import { GetAdsBillingsByUser } from "../../services/ads_billings";
import { SystemData } from "../../dto/AdsBillingsDTO";
import withAuth from "../../hocs/withAuth";

function Invoice() {
  const [openInvoiceDetails, setOpenInvoiceDetails] = useState(false);
  const [datas, setDatas] = useState<SystemData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Chi phí quảng cáo - hóa đơn"
  }, []);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const res = await GetAdsBillingsByUser({});
      setDatas(res.data.data.list);
      setLoading(false);
    })()
  }, []);

  return (
    <div className="px-4">
      <HeaderInvoice />
      <div className="pt-[136px]">
        {datas.map(data => data.group_datas.map(x => x.user_datas.map((y, index) => (
            <div className="border-b-4 border-cyan-700 py-6" key={index}>
              <TableInvoice setOpenInvoiceDetails={setOpenInvoiceDetails} data={y} loading={loading} />
              <TableInvoiceRent setOpenInvoiceDetails={setOpenInvoiceDetails} data={y} loading={loading} />
            </div>
        ))))}
      </div>
      {openInvoiceDetails && <InvoiceDetails onClose={() => setOpenInvoiceDetails(false)} />}
    </div>
  )
}

const InvoiceWithAuth = withAuth(Invoice)

export default InvoiceWithAuth;