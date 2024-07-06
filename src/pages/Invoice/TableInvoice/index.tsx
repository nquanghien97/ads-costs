import { AdsBillingsByUserDTO } from "../../../dto/AdsBillingsDTO";
import TotalInvoice from "./TotalInvoice";

interface TableInvoiceProps {
  setOpenInvoiceDetails: React.Dispatch<React.SetStateAction<boolean>>
  data: AdsBillingsByUserDTO
}

function TableInvoice(props: TableInvoiceProps) {

  const { setOpenInvoiceDetails, data } = props;
  return (
    <>
      <div className="py-2 flex justify-start">
        <span className="px-6 py-2 rounded-full bg-[#0071BA] text-white w-[60%]">
          {/* Mã MKT - Họ tên - HKD - Hệ thống */}
          {`${data.username} - ${data.name}`}
        </span>
      </div>
      <div className="flex gap-2">
        <div className="flex-[0_0_60%] w-full">
          <TotalInvoice data={data.list} setOpenInvoiceDetails={setOpenInvoiceDetails} />
        </div>
      </div>
    </>
  )
}

export default TableInvoice;
