import { AdsBillingsByUserDTO } from "../../../dto/AdsBillingsDTO";
import InvoiceByDate from "../InvoiceByDate";
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
        <span className="px-6 py-2 rounded-full bg-[#0071BA] text-white">
          {/* Mã MKT - Họ tên - HKD - Hệ thống */}
          {`${data.username} - ${data.name}`}
        </span>
      </div>
      <div className="py-2 flex justify-start">
        <span className="px-6 py-2 rounded-full bg-[#eb9d4d] text-white">TKQC Thường</span>
      </div>
      <div className="flex gap-2">
        <div className="flex-[0_0_60%]  custom-header-table">
          <TotalInvoice data={data.list}/>
        </div>
        <div className="relative overflow-x-auto custom-header-table-bydate flex gap-2 flex-[0_0_40%]">
        {
          data.list.map((item) => {
            return item.datas.map((smallItem) => (
                <div className="" key={smallItem.time}>
                  <InvoiceByDate setOpenInvoiceDetails={setOpenInvoiceDetails} data={smallItem} />
                </div>
            ))
          })
        }
        </div>
      </div>
    </>
  )
}

export default TableInvoice;
