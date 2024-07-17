import { AdsBillingsByUser } from "../../../dto/AdsBillingsDTO";
import TotalInvoice from "./TotalInvoice";

interface TableInvoiceRentProps {
  setOpenInvoiceDetails: React.Dispatch<React.SetStateAction<boolean>>
  data: AdsBillingsByUser
  loading: boolean
}

function TableInvoice(props: TableInvoiceRentProps) {

  const { setOpenInvoiceDetails, data, loading } = props;
  return (
    <>
      <div className="flex gap-2">
        <div className="flex-[0_0_60%] w-full">
          <TotalInvoice data={data.list.filter(item => item.ad_account.type === "Thuê")} setOpenInvoiceDetails={setOpenInvoiceDetails} loading={loading} />
        </div>
      </div>
    </>
  )
}

export default TableInvoice;
