import { useEffect, useState } from "react";
import HeaderInvoice from "./HeaderInvoice";
import InvoiceDetails from "./InvoiceDetails";
import TableInvoice from "./TableInvoice";
import TableInvoiceRent from "./TableInvoiceRent";
import { GetAdsCostsByUser } from "../../services/ads_costs";
import { SystemData } from "../../dto/AdsBillingsDTO";
import withAuth from "../../hocs/withAuth";
import { useAuthStore } from "../../zustand/auth.store";
import { UserRole } from "../../entities/User";

function Invoice() {
  const [openInvoiceDetails, setOpenInvoiceDetails] = useState(false);
  const [datas, setDatas] = useState<SystemData[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(false);
  const { user } = useAuthStore();

  useEffect(() => {
    document.title = "Chi phí quảng cáo - hóa đơn"
  }, []);

  useEffect(() => {
    setLoading(true);
    if(user.role === UserRole.ROOT) return;
    (async () => {
      const res = await GetAdsCostsByUser({});
      setDatas(res.data.data.list);
      setLoading(false);
    })()
  }, [user.role, refreshKey]);

  return (
    <div className="px-4">
      <HeaderInvoice setDatas={setDatas} setRefreshKey={setRefreshKey} />
      <div className="pt-[136px]">
        {datas.length === 0 ? (
          <div>Không có dữ liệu</div>
        ) : (
          datas.map(data => data.group_datas.map(data => data.user_datas.map((item, index) => (
            <div className="border-b-4 border-cyan-700 py-6" key={index}>
              <TableInvoice setOpenInvoiceDetails={setOpenInvoiceDetails} data={item} loading={loading} />
              <TableInvoiceRent setOpenInvoiceDetails={setOpenInvoiceDetails} data={item} loading={loading} />
            </div>
          ))))
        )}
      </div>
      {openInvoiceDetails && <InvoiceDetails onClose={() => setOpenInvoiceDetails(false)} />}
    </div>
  )
}

const InvoiceWithAuth = withAuth(Invoice)

export default InvoiceWithAuth;