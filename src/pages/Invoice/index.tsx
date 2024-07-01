import { useState } from "react";
import HeaderInvoice from "./HeaderInvoice";
import InvoiceDetails from "./InvoiceDetails";
import TableInvoice from "./TableInvoice";

function Invoice() {
  const [openInvoiceDetails, setOpenInvoiceDetails] = useState(true);
  return (
    <div className="px-6">
      <HeaderInvoice />
      <TableInvoice />
      {openInvoiceDetails && <InvoiceDetails onClose={() => setOpenInvoiceDetails(false)} />}
    </div>
  )
}

export default Invoice;