import { useEffect, useState } from "react";
import Header from "./Header";
import AdAccount from "./AdAccount";
// import AdAccountRent from "./AdAccountRent";
import { UserData } from "../../dto/AdsBillingsDTO";
import withAuth from "../../hocs/withAuth";
import { useAuthStore } from "../../zustand/auth.store";
import { UserRole } from "../../entities/User";
import LoadingIcon from "../../assets/icons/LoadingIcon";
import React from "react";
import { GetAdsCostsCampaigns } from "../../services/statistics_campaigns";

function AdCostsCampaigns() {
  const [datas, setDatas] = useState<UserData[]>();
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(false);
  const { user } = useAuthStore();
  const [showAdCostsCampaigns, setShowAdCostsCampaigns] = useState(true);
  const [showBillCosts, setShowBillCosts] = useState(false);

  useEffect(() => {
    document.title = "Chi phí quảng cáo - hóa đơn"
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await GetAdsCostsCampaigns({});
      setDatas(res.data.data.list);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      if (user.role !== UserRole.ROOT && user.role) {
        await fetchData()
      }
    })()
  }, [user.role, refreshKey]);

  const filteredData = datas?.map(user => ({
    ...user,
    ad_account_datas: user.ad_account_datas.filter(account => account.ad_account !== null)
  }))
    .filter(user => user.ad_account_datas.length > 0)
    .filter(user => user.username !== 'noname')

  const renderBody = () => {
    if (loading) return <div className="flex justify-center py-4"><LoadingIcon /></div>
    if (!datas || !filteredData) return <div className="h-[300px] flex justify-center items-center text-xl">Vui lòng chọn hệ thống để hiển thị dữ liệu...</div>
    if (filteredData?.length === 0) return <div>Không có dữ liệu</div>
    return (
      <AdAccount data={filteredData} loading={loading} showAdCostsCampaigns={showAdCostsCampaigns} showBillCosts={showBillCosts} />
    )
  }

  return (
    <div className="px-4">
      <Header
        setDatas={setDatas}
        setLoading={setLoading}
        setRefreshKey={setRefreshKey}
        dataExportExcel={filteredData}
        setShowAdCostsCampaigns={setShowAdCostsCampaigns}
        setShowBillCosts={setShowBillCosts}
        showAdCostsCampaigns={showAdCostsCampaigns}
        showBillCosts={showBillCosts}
      />
      <div className="pt-[136px]">
        {renderBody()}
      </div>
    </div>
  )
}

const AdCostsCampaignsWithAuth = withAuth(React.memo(AdCostsCampaigns))

export default AdCostsCampaignsWithAuth;