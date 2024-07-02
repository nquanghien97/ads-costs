import InvoiceByDate from "./InvoiceByDate";
import TotalInvoice from "./TotalInvoice";

interface InvoiceByDateProps {
  setOpenInvoiceDetails: React.Dispatch<React.SetStateAction<boolean>>
}

function TableInvoice(props: InvoiceByDateProps) {
  const { setOpenInvoiceDetails } = props;
  return (
    <div className="flex gap-2">
      <div className="flex-[0_0_60%]">
        <TotalInvoice />
      </div>
      <div className="flex gap-2 flex-[0_0_40%] overflow-x-auto">
        <InvoiceByDate setOpenInvoiceDetails={setOpenInvoiceDetails} />
        <InvoiceByDate setOpenInvoiceDetails={setOpenInvoiceDetails} />
        <InvoiceByDate setOpenInvoiceDetails={setOpenInvoiceDetails} />
      </div>
    </div>
  )
}

export default TableInvoice;
