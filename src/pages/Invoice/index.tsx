import { useState } from "react";
import HeaderInvoice from "./HeaderInvoice";
import InvoiceDetails from "./InvoiceDetails";
import TableInvoice from "./TableInvoice";

function Invoice() {
  const [openInvoiceDetails, setOpenInvoiceDetails] = useState(false);
  return (
    <div className="px-6">
      <HeaderInvoice />
      <TableInvoice setOpenInvoiceDetails={setOpenInvoiceDetails} />
      {openInvoiceDetails && <InvoiceDetails onClose={() => setOpenInvoiceDetails(false)} />}
    </div>
  )
}

export default Invoice;