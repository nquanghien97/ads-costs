import { AdsBillingsByUser } from "../../../dto/AdsBillingsDTO";
import TotalInvoice from "./TotalInvoice";

interface TableInvoiceProps {
  setOpenInvoiceDetails: React.Dispatch<React.SetStateAction<boolean>>
  data: AdsBillingsByUser
  loading: boolean
}

function TableInvoice(props: TableInvoiceProps) {

  const { setOpenInvoiceDetails, data, loading } = props;
  return (
    <>
      <div className="py-2 flex justify-start">
        <span className="px-6 py-2 rounded-full bg-[#0071BA] text-white w-[60%]">
          {/* Mã MKT - Họ tên - HKD - Hệ thống */}
          {`${data.name}`}
        </span>
      </div>
      <div className="flex gap-2">
        <div className="flex-[0_0_60%] w-full">
          <TotalInvoice data={data.list.filter(item => item.ad_account.type !== "Thuê")} setOpenInvoiceDetails={setOpenInvoiceDetails} loading={loading} />
        </div>
      </div>
    </>
  )
}

export default TableInvoice;
