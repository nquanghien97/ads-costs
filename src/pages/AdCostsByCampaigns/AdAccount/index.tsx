import { UserData } from "../../../dto/AdsBillingsDTO";
import AdAccountTable from "./AdAccountTable";

interface AdAccountProps {
  data: UserData[]
  loading: boolean
  showAdCostsCampaigns: boolean
  showBillCosts: boolean
}

function AdAccount(props: AdAccountProps) {

  const { data, loading, showAdCostsCampaigns, showBillCosts } = props;
  return (
    <>
      <div className="flex gap-2">
        <div className="w-full">
          <AdAccountTable
            data={data}
            loading={loading}
            showAdCostsCampaigns={showAdCostsCampaigns}
            showBillCosts={showBillCosts}
          />
        </div>
      </div>
    </>
  )
}

export default AdAccount;
