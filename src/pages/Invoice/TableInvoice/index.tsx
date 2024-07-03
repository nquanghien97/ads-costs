import InvoiceByDate from "../InvoiceByDate";
import TotalInvoice from "./TotalInvoice";

interface TableInvoiceProps {
  setOpenInvoiceDetails: React.Dispatch<React.SetStateAction<boolean>>
}

function TableInvoice(props: TableInvoiceProps) {

  const { setOpenInvoiceDetails } = props;
  return (
    <>
      <div className="py-2 flex justify-start">
        <span className="px-6 py-2 rounded-full bg-[#eb9d4d] text-white">TKQC Thường</span>
      </div>
      <div className="flex gap-2">
        <div className="flex-[0_0_60%]  custom-header-table">
          <TotalInvoice />
        </div>
        <div className="relative overflow-x-auto custom-header-table-bydate">
          <div className="flex gap-2 flex-[0_0_40%]">
            <InvoiceByDate setOpenInvoiceDetails={setOpenInvoiceDetails} />
            <InvoiceByDate setOpenInvoiceDetails={setOpenInvoiceDetails} />
            <InvoiceByDate setOpenInvoiceDetails={setOpenInvoiceDetails} />
          </div>
        </div>
      </div>
    </>
  )
}

export default TableInvoice;
