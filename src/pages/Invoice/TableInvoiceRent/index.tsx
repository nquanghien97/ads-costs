import InvoiceByDate from "../InvoiceByDate";
import TotalInvoice from "./TotalInvoice";

interface TableInvoiceRentProps {
  setOpenInvoiceDetails: React.Dispatch<React.SetStateAction<boolean>>
}

function TableInvoice(props: TableInvoiceRentProps) {

  const { setOpenInvoiceDetails } = props;
  return (
    <>
      <div className="py-2 flex justify-start">
        <span className="px-6 py-2 rounded-full bg-[#8e3e58] text-white">TKQC Thuê</span>
      </div>
      <div className="flex gap-2">
        <div className="flex-[0_0_60%] custom-header-table-rent">
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
