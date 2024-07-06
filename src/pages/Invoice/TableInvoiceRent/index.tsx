import { AdsBillingsByUserDTO } from "../../../dto/AdsBillingsDTO";
import TotalInvoice from "./TotalInvoice";

interface TableInvoiceRentProps {
  setOpenInvoiceDetails: React.Dispatch<React.SetStateAction<boolean>>
  data: AdsBillingsByUserDTO
}

function TableInvoice(props: TableInvoiceRentProps) {

  const { setOpenInvoiceDetails, data } = props;
  return (
    <>
      <div className="flex gap-2">
        <div className="flex-[0_0_60%] w-full">
          <TotalInvoice data={data.list} setOpenInvoiceDetails={setOpenInvoiceDetails} />
        </div>
      </div>
    </>
  )
}

export default TableInvoice;
