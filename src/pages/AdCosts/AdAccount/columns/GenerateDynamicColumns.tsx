import { Select } from 'antd';
import { TableColumnsType } from 'antd';
import { SystemData, TotalDailyData } from '../../../../dto/AdsBillingsDTO';
import EyeIcon from '../../../../assets/icons/EyeIcon';
import { formatCurrency } from '../../../../utils/currency';
import { useNotification } from '../../../../hooks/useNotification';
import { updateStatusAds, updateStatusBill } from '../../../../services/ads_bills';
import { useState } from 'react';
import axios from 'axios';
import { UserRole } from '../../../../entities/User';
import { useAuthStore } from '../../../../zustand/auth.store';

const options = [
  { value: 'Chưa XN', label: 'Chưa XN' },
  { value: 'Đã XN (MKT)', label: 'Đã XN (MKT)' },
  { value: 'Sai số (MKT)', label: 'Sai số (MKT)' },
  { value: 'Đã XN (KT)', label: 'Đã XN (KT)' },
  { value: 'Sai số (KT)', label: 'Sai số (KT)' },
];

const optionsWithUserRole = [
  { value: 'Chưa XN', label: 'Chưa XN' },
  { value: 'Đã XN (MKT)', label: 'Đã XN (MKT)' },
  { value: 'Sai số (MKT)', label: 'Sai số (MKT)' },
];
interface GenerateDynamicColumnsProps {
  setDataDetails: React.Dispatch<React.SetStateAction<{
    ad_account_id: number;
    date: string;
    currency: string;
  }>>;
  datas: TotalDailyData;
  setOpenAdCostsDetails: React.Dispatch<React.SetStateAction<boolean>>
  setLoadingTable: React.Dispatch<React.SetStateAction<boolean>>
  showAdCosts: boolean
  showBillCosts: boolean
}

export const GenerateDynamicColumns = (props: GenerateDynamicColumnsProps): TableColumnsType<SystemData> => {
  const { setDataDetails, datas, setOpenAdCostsDetails, setLoadingTable, showAdCosts, showBillCosts } = props;
  const [selectedStatus, setSelectedStatus] = useState<Record<number, string>>({});
  const [selectedBillStatus, setSelectedBillStatus] = useState<Record<number, string>>({});
  const notification = useNotification()
  const { user } = useAuthStore()

  const onChangeStatus = async (value: string, date_id: number) => {
    setSelectedStatus((prevStatus) => ({ ...prevStatus, [date_id]: value }));
    setLoadingTable(true);
    try {
      await updateStatusAds(date_id, value);
      notification.success('Cập nhật trạng thái CPQC thành công')
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const invalidData = err.response?.data.invalidData
        for (const key in invalidData) {
          if (Array.isArray(invalidData[key]) && invalidData[key].includes("Không hợp lệ.")) {
            notification.error('Bạn không có quyền để chỉnh sửa trạng thái này')
            break;
          }
        }
        if (!invalidData) {
          notification.error('Có lỗi xảy ra, vui lòng thử lại!')
        }
      }
    } finally {
      setLoadingTable(false)
    }
  }

  const onChangeBillStatus = async (value: string, date_id: number) => {
    setSelectedBillStatus((prevStatus) => ({ ...prevStatus, [date_id]: value }));
    setLoadingTable(true);
    try {
      await updateStatusBill(date_id, value);
      notification.success('Cập nhật trạng thái hóa đơn thành công')
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const invalidData = err.response?.data.invalidData
        for (const key in invalidData) {
          if (Array.isArray(invalidData[key]) && invalidData[key].includes("Không hợp lệ.")) {
            notification.error('Bạn không có quyền để chỉnh sửa trạng thái này')
            break;
          }
        }
        if (!invalidData) {
          notification.error('Có lỗi xảy ra, vui lòng thử lại!')
        }
      }
    } finally {
      setLoadingTable(false)
    }
  }

  const getBackgroundColor = (value: string) => {
    if (value === 'Đã XN (KT)' || value === 'Đã XN (MKT)') return '[&>*]:!bg-[#68c2ed] [&>*]:!text-black';
    if (value === 'Sai số (KT)' || value === 'Sai số (MKT)') return '[&>*]:!bg-[#ff4d4f] [&>*]:!text-white';
    if (value === 'Chưa XN') return '#d9d9d9'; // Màu mặc định cho "Chưa XN"
    return 'white';
  };

  const dates = Object.keys(datas);
  return dates.flatMap((date, index) => ({
    title: date,
    children: [
      showBillCosts &&
      {
        title: `Tổng hóa đơn`,
        key: `bill_${index}`,
        width: 140,
        className: "dynamic-col",
        render: (_: unknown, record: SystemData) => {
          return record.group_datas.flatMap(item => item.user_datas.flatMap(innerItem => innerItem.ad_account_datas.flatMap(data => (
            <div key={data.ad_account.id} className="border-t-[1px] border-black">
              <div className="row-custom flex items-center gap-2 bg-[#e9e9e9]">
                {formatCurrency(data.datas?.[date]?.bill)}
                <div
                  onClick={() => {
                    setOpenAdCostsDetails(true)
                    setDataDetails({
                      ad_account_id: data.ad_account_id,
                      date: date,
                      currency: data.ad_account.currency
                    })
                  }}
                  className="cursor-pointer"
                >
                  <EyeIcon width={18} height={18} />
                </div>
              </div>
              <div className="row-custom flex items-center justify-between gap-2 ">
                {formatCurrency(data.datas?.[date]?.bill_vnd)}
              </div>
            </div>
          ))))
        },
      },
      showBillCosts &&
      {
        title: "Xác nhận hóa đơn",
        key: `xacnhan_${index}`,
        width: 160,
        className: "dynamic-col",
        render: (_: unknown, record: SystemData) => {
          return record.group_datas.flatMap(item => item.user_datas.flatMap(innerItem => innerItem.ad_account_datas.flatMap(data => {
            const date_id = data.datas?.[date]?.id
            const currentStatus = selectedBillStatus[date_id] || data.datas?.[date]?.bill_status;
            return (
              <div className={`px-2 flex items-center h-[78px] border-t-[1px] border-black select-${data.datas?.[date]?.id}`} key={data.ad_account.id}>
                <Select
                  options={(user.role !== UserRole.ACCOUNTANT && user.role !== UserRole.ROOT) ? optionsWithUserRole : options}
                  value={currentStatus}
                  onChange={(value) => onChangeBillStatus(value, data.datas?.[date]?.id)}
                  size="large"
                  defaultValue={data.datas?.[date]?.bill_status}
                  className={`w-full ${getBackgroundColor(currentStatus)}`}
                  placeholder={!data.datas?.[date]?.bill_status ? 'Không có dữ liệu' : 'Lựa chọn...'}
                  disabled={!data.datas?.[date]?.bill_status || ((user.role !== UserRole.ACCOUNTANT && user.role !== UserRole.ROOT && (selectedBillStatus[date_id] || data.datas?.[date]?.bill_status) === "Đã XN (KT)" && (selectedBillStatus[date_id] || data.datas?.[date]?.bill_status) === "Sai số (KT)"))}
                />
              </div>
            )
          })))
        },
      },
      showAdCosts &&
      {
        title: `Tổng CPQC`,
        key: `ads_${index}`,
        width: 120,
        className: "dynamic-col",
        render: (_: unknown, record: SystemData) => {
          return record.group_datas.flatMap(item => item.user_datas.flatMap(innerItem => innerItem.ad_account_datas.flatMap(data =>
          (
            <div key={data.ad_account.id} className="border-t-[1px] border-black">
              <div className="row-custom bg-[#e9e9e9]">{formatCurrency(data.datas?.[date]?.ads) || 0}</div>
              <div className="row-custom ">{formatCurrency(data.datas?.[date]?.ads_vnd) || 0}</div>
            </div>
          )
          )))
        },
      },
      showAdCosts &&
      {
        title: "Xác nhận CPQC",
        key: `xacnhan_${index}`,
        width: 160,
        className: "dynamic-col",
        render: (_: unknown, record: SystemData) => {
          return record.group_datas.flatMap(item => item.user_datas.flatMap(innerItem => innerItem.ad_account_datas.flatMap(data => {
            const date_id = data.datas?.[date]?.id
            const currentStatus = selectedStatus[date_id] || data.datas?.[date]?.status;
            return (
              <div className={`px-2 flex items-center h-[78px] border-t-[1px] border-black select-${data.datas?.[date]?.id}`} key={data.ad_account.id}>
                <Select
                  options={(user.role !== UserRole.ACCOUNTANT && user.role !== UserRole.ROOT) ? optionsWithUserRole : options}
                  onChange={(value) => onChangeStatus(value, data.datas?.[date]?.id)}
                  size="large"
                  value={currentStatus}
                  defaultValue={data.datas?.[date]?.status}
                  className={`w-full ${getBackgroundColor(currentStatus)}`}
                  placeholder={!data.datas?.[date]?.status ? 'Không có dữ liệu' : 'Lựa chọn...'}
                  disabled={!data.datas?.[date]?.status || ((user.role !== UserRole.ACCOUNTANT && user.role !== UserRole.ROOT && (selectedStatus[date_id] || data.datas?.[date]?.status) === "Đã XN (KT)" || (selectedStatus[date_id] || data.datas?.[date]?.status) === "Sai số (KT)"))}
                />
              </div>
            )
          })))
        },
      },
    ].filter(Boolean)
  }));
};

