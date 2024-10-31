import { useEffect, useState } from "react";
import Header from "./Header";
import AdAccount from "./AdAccount";
import { GetAdsCostsByUser } from "../../services/ads_costs";
import { UserData } from "../../dto/AdsBillingsDTO";
import withAuth from "../../hocs/withAuth";
import { useAuthStore } from "../../zustand/auth.store";
import LoadingIcon from "../../assets/icons/LoadingIcon";
import React from "react";
import dayjs from "dayjs";
import { formatDate } from "../../utils/date";

function AdCosts() {
  const [datas, setDatas] = useState<UserData[]>();
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(false);
  const { user } = useAuthStore();
  const [showAdCosts, setShowAdCosts] = useState(true);
  const [showBillCosts, setShowBillCosts] = useState(false);

  useEffect(() => {
    document.title = "Chi phí quảng cáo - hóa đơn"
  }, []);
  
  useEffect(() => {
    const defaultDate = new Date(dayjs().subtract(1, 'day').startOf('day').toDate())
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await GetAdsCostsByUser({ since: formatDate(new Date(defaultDate)), until: formatDate(new Date(defaultDate)) });
        setDatas(res.data.data.list);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData()
  }, [user.role, refreshKey]);

  const filteredData = datas?.map(user => ({
    ...user,
    ad_account_datas: user.ad_account_datas.filter(account => account.ad_account !== null)
  }))
    .filter(user => user.ad_account_datas.length > 0)
    .filter(user => user.username === 'noname')

  const renderBody = () => {
    if (loading) return <div className="flex justify-center py-4"><LoadingIcon /></div>
    if (filteredData?.length === 0 || !filteredData) return <div>Không có dữ liệu</div>
    return (
      <AdAccount data={filteredData} loading={loading} showAdCosts={showAdCosts} showBillCosts={showBillCosts} />
    )
  }

  return (
    <div className="px-4">
      <Header
        setDatas={setDatas}
        setLoading={setLoading}
        setRefreshKey={setRefreshKey}
        dataExportExcel={filteredData}
        setShowAdCosts={setShowAdCosts}
        setShowBillCosts={setShowBillCosts}
        showAdCosts={showAdCosts}
        showBillCosts={showBillCosts}
      />
      <div className="pt-[136px]">
        {renderBody()}
      </div>
    </div>
  )
}

const AdCostsWithAuth = withAuth(React.memo(AdCosts))

export default AdCostsWithAuth;