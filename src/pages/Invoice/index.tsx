import { useState } from "react";
import HeaderInvoice from "./HeaderInvoice";
import InvoiceDetails from "./InvoiceDetails";
import TableInvoice from "./TableInvoice";
import TableInvoiceRent from "./TableInvoiceRent";

function Invoice() {
  const [openInvoiceDetails, setOpenInvoiceDetails] = useState(false);
  return (
    <div className="px-4">
      <HeaderInvoice />
      <TableInvoice setOpenInvoiceDetails={setOpenInvoiceDetails} />
      <TableInvoiceRent setOpenInvoiceDetails={setOpenInvoiceDetails} />
      {openInvoiceDetails && <InvoiceDetails onClose={() => setOpenInvoiceDetails(false)} />}
    </div>
  )
}

export default Invoice;