import { UserData } from "../../../dto/AdsBillingsDTO";
import AdAccountTable from "./AdAccountTable";

interface AdAccountProps {
  data: UserData
  loading: boolean
}

function AdAccount(props: AdAccountProps) {

  const { data, loading } = props;
  const group_system = data.ad_account_datas.filter(item => item.ad_account !== null).flatMap(item => `${item.ad_account.group.name} - ${item.ad_account.system.name}`)
  return (
    <>
      <div className="py-2 flex justify-start">
        <span className="px-6 py-2 rounded-full bg-[#0071BA] text-white w-[60%]">
          {/* Mã MKT - Họ tên - HKD - Hệ thống */}
          {`${data.username} - ${data.name} - ${group_system[0]}`}
        </span>
      </div>
      <div className="flex gap-2">
        <div className="w-full">
          <AdAccountTable
            data={data.ad_account_datas.filter(item => (item.ad_account !== null && item.ad_account.type !== "TK THUÊ"))}
            loading={loading}
          />
        </div>
      </div>
    </>
  )
}

export default AdAccount;
