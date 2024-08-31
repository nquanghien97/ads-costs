import { SystemData } from "../../../dto/AdsBillingsDTO";
import AdAccountTable from "./AdAccountTable";

interface AdAccountProps {
  data: SystemData[]
  loading: boolean
  showAdCosts: boolean
  showBillCosts: boolean
}

function AdAccount(props: AdAccountProps) {

  const { data, loading, showAdCosts, showBillCosts } = props;
  return (
    <>
      <div className="flex gap-2">
        <div className="w-full">
          <AdAccountTable
            data={data}
            loading={loading}
            showAdCosts={showAdCosts}
            showBillCosts={showBillCosts}
          />
        </div>
      </div>
    </>
  )
}

export default AdAccount;
