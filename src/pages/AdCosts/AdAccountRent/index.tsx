import { UserData } from "../../../dto/AdsBillingsDTO";
import AdAccountRentTable from "./AdAccountRentTable";

interface AdAccountRentProps {
  setOpenInvoiceDetails: React.Dispatch<React.SetStateAction<boolean>>
  data: UserData
  loading: boolean
}

function AdAccountRent(props: AdAccountRentProps) {

  const { setOpenInvoiceDetails, data, loading } = props;
  return (
    <>
      <div className="flex gap-2">
        <div className=" w-full">
          <AdAccountRentTable
            data={data.ad_account_datas.filter(item => (item.ad_account?.type === "TK THUÊ" && item.ad_account !== null) )}
            setOpenInvoiceDetails={setOpenInvoiceDetails}
            loading={loading}
          />
        </div>
      </div>
    </>
  )
}

export default AdAccountRent;