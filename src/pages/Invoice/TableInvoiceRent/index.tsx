import { AdsBillingsByUserDTO } from "../../../dto/AdsBillingsDTO";
import InvoiceByDate from "../InvoiceByDate";
import TotalInvoice from "./TotalInvoice";

interface TableInvoiceRentProps {
  setOpenInvoiceDetails: React.Dispatch<React.SetStateAction<boolean>>
  data: AdsBillingsByUserDTO
}

function TableInvoice(props: TableInvoiceRentProps) {

  const { setOpenInvoiceDetails, data } = props;
  return (
    <>
      <div className="py-2 flex justify-start">
        <span className="px-6 py-2 rounded-full bg-[#8e3e58] text-white">TKQC Thuê</span>
      </div>
      <div className="flex gap-2">
        <div className="flex-[0_0_60%] custom-header-table-rent">
          <TotalInvoice data={data.list}  />
        </div>
        <div className="relative overflow-x-auto custom-header-table-bydate">
          <div className="flex gap-2 flex-[0_0_40%]">
            {
              data.list.map((item) => {
                return item.datas.map((smallItem) => (
                    <div key={smallItem.time}>
                      <InvoiceByDate setOpenInvoiceDetails={setOpenInvoiceDetails} data={smallItem} />
                    </div>
                ))
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default TableInvoice;
