import { useEffect, useState } from "react";
import HeaderInvoice from "./HeaderInvoice";
import InvoiceDetails from "./InvoiceDetails";
import TableInvoice from "./TableInvoice";
import TableInvoiceRent from "./TableInvoiceRent";
import { AdsBillings } from "../../services/adsServices";
import { AdsBillingsByUserDTO } from "../../dto/AdsBillingsDTO";
import LoadingIcon from "../../assets/icons/LoadingIcon";

function Invoice() {
  const [openInvoiceDetails, setOpenInvoiceDetails] = useState(false);
  const [datas, setDatas] = useState<AdsBillingsByUserDTO[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    (async () => {
      const res = await AdsBillings();
      setDatas(res.data);
      setLoading(false);
    })()
  }, []);

  console.log(datas)

  return (
    <div className="px-4">
      <HeaderInvoice />
      {loading ? (
        <div className="flex justify-center">
          <LoadingIcon />
        </div>
      ): (
        <>
          {datas.map((data) => (
            <div className="border-b-4 border-cyan-700 py-6" key={data.user_id}>
              <TableInvoice setOpenInvoiceDetails={setOpenInvoiceDetails} data={data} />
              <TableInvoiceRent setOpenInvoiceDetails={setOpenInvoiceDetails} data={data} />
            </div>
          ))}
        </>
      )}
      {openInvoiceDetails && <InvoiceDetails onClose={() => setOpenInvoiceDetails(false)} />}
    </div>
  )
}

export default Invoice;