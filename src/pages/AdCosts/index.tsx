import { useEffect, useState } from "react";
import Header from "./Header";
import InvoiceDetails from "./InvoiceDetails";
import AdAccount from "./AdAccount";
import AdAccountRent from "./AdAccountRent";
import { GetAdsCostsByUser } from "../../services/ads_costs";
import { SystemData } from "../../dto/AdsBillingsDTO";
import withAuth from "../../hocs/withAuth";
import { useAuthStore } from "../../zustand/auth.store";
import { UserRole } from "../../entities/User";
import LoadingIcon from "../../assets/icons/LoadingIcon";

function Invoice() {
  const [openInvoiceDetails, setOpenInvoiceDetails] = useState(false);
  const [datas, setDatas] = useState<SystemData[]>();
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(false);
  const { user } = useAuthStore();

  useEffect(() => {
    document.title = "Chi phí quảng cáo - hóa đơn"
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await GetAdsCostsByUser({});
      setDatas(res.data.data.list);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // const handleSearchClick = async () => {
  //   if (user.role === UserRole.ROOT) {
  //     // setRefreshKey(pre => !pre)
  //     await fetchData();
  //   }
  // };

  useEffect(() => {
    (async () => {
      if(user.role !== UserRole.ROOT && user.role ) {
        await fetchData()
      }
    })()
  }, [user.role, refreshKey]);

  const filteredData = datas?.map(system => ({
    ...system,
    group_datas: system.group_datas.map(group => ({
      ...group,
      user_datas: group.user_datas.map(user => ({
        ...user,
        ad_account_datas: user.ad_account_datas.filter(account => account.ad_account !== null)
      })).filter(user => user.ad_account_datas.length > 0)
    })).filter(group => group.user_datas.length > 0)
  })).filter(system => system.group_datas.length > 0);

  const renderBody = () => {
    if (loading) return <div className="flex justify-center py-4"><LoadingIcon /></div>
    if (!datas) return <div className="h-[300px] flex justify-center items-center text-xl">Vui lòng chọn hệ thống để hiển thị dữ liệu...</div>
    if (filteredData?.length === 0) return <div>Không có dữ liệu</div>
    return (
      filteredData?.map(data => data.group_datas.map(data => data.user_datas.map((item, index) => (
        <div className="border-b-4 border-cyan-700 py-6" key={index}>
          <AdAccount setOpenInvoiceDetails={setOpenInvoiceDetails} data={item} loading={loading} />
          <AdAccountRent setOpenInvoiceDetails={setOpenInvoiceDetails} data={item} loading={loading} />
        </div>
    ))))
    )
  }

  return (
    <div className="px-4">
      <Header setDatas={setDatas} setLoading={setLoading} setRefreshKey={setRefreshKey} />
      <div className="pt-[136px]">
        {renderBody()}
      </div>
      {openInvoiceDetails && <InvoiceDetails onClose={() => setOpenInvoiceDetails(false)} />}
    </div>
  )
}

const InvoiceWithAuth = withAuth(Invoice)

export default InvoiceWithAuth;