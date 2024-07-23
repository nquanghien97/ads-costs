import { UserData } from "../../../dto/AdsBillingsDTO";
import TotalInvoice from "./TotalInvoice";

interface TableInvoiceProps {
  setOpenInvoiceDetails: React.Dispatch<React.SetStateAction<boolean>>
  data: UserData
  loading: boolean
}

function TableInvoice(props: TableInvoiceProps) {

  const { setOpenInvoiceDetails, data, loading } = props;
  const group_system = data.ad_account_datas.flatMap(item => `${item.ad_account.group.name} - ${item.ad_account.system.name}`)
  return (
    <>
      <div className="py-2 flex justify-start">
        <span className="px-6 py-2 rounded-full bg-[#0071BA] text-white w-[60%]">
          {/* Mã MKT - Họ tên - HKD - Hệ thống */}
          {`${data.username} - ${data.name} - ${group_system[0]}`}
        </span>
      </div>
      <div className="flex gap-2">
        <div className="flex-[0_0_60%] w-full">
          <TotalInvoice data={data.ad_account_datas.filter(item => item.ad_account.type !== "thuê")} setOpenInvoiceDetails={setOpenInvoiceDetails} loading={loading} />
        </div>
      </div>
    </>
  )
}

export default TableInvoice;
