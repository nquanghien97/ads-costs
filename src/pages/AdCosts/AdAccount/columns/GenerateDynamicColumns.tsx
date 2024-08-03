import { Select } from 'antd';
import { TableColumnsType } from 'antd';
import { AdAccountData, TotalDailyData } from '../../../../dto/AdsBillingsDTO';
import EyeIcon from '../../../../assets/icons/EyeIcon';
import { formatCurrency } from '../../../../utils/currency';
import { useNotification } from '../../../../hooks/useNotification';
import { updateStatusAdsBill } from '../../../../services/ads_bills';
import { useState } from 'react';

const options = [
  { value: 'Đã XN', label: 'Đã XN' },
  { value: 'Sai số', label: 'Sai số' },
  { value: 'Chưa XN', label: 'Chưa XN' },
];

interface GenerateDynamicColumnsProps {
  setDataDetails: React.Dispatch<React.SetStateAction<{
    ad_account_id: number;
    date: string;
    currency: string;
  }>>;
  datas: TotalDailyData;
  setOpenInvoiceDetails: React.Dispatch<React.SetStateAction<boolean>>
  setLoadingTable: React.Dispatch<React.SetStateAction<boolean>>
}

export const GenerateDynamicColumns = (props: GenerateDynamicColumnsProps): TableColumnsType<AdAccountData> => {
  const { setDataDetails, datas, setOpenInvoiceDetails, setLoadingTable } = props;
  const [selectedStatus, setSelectedStatus] = useState<Record<number, string>>({});

  const notification = useNotification()
  console.log(selectedStatus)

  const onChangeStatus = async (value: string, date_id: number) => {
    setSelectedStatus((prevStatus) => ({ ...prevStatus, [date_id]: value }));
    setLoadingTable(true);
    try {
      await updateStatusAdsBill(date_id, value);
      notification.success('Cập nhật trạng thái thành công')
    } catch (err) {
      console.log(err)
    } finally {
      setLoadingTable(false)
    }
  }

  const getBackgroundColor = (value: string) => {
    if (value === 'Đã XN') return '[&>*]:!bg-[#0071ba] [&>*]:!text-white';
    if (value === 'Sai số') return '[&>*]:!bg-[#ff4d4f] [&>*]:!text-white';
    if (value === 'Chưa XN') return '#d9d9d9'; // Màu mặc định cho "Chưa XN"
    return 'white';
  };

  const dates = Object.keys(datas);
  return dates.flatMap((date, index) => ({
    title: date,
    children: [
      {
        title: `Tổng CPQC`,
        key: `ads_${index}`,
        width: 120,
        render: (_, record) => {
          return (
            <div>
              <div className="row-custom bg-[#c7ecce]">{formatCurrency(record.datas?.[date]?.ads)}</div>
              <div className="row-custom bg-[white]">{formatCurrency(record.datas?.[date]?.ads_vnd)}</div>
            </div>
          )
        },
      },
      {
        title: `Tổng hóa đơn`,
        key: `bill_${index}`,
        width: 140,
        render: (_, record) => (
          <>
            <div>
              <div className="row-custom flex items-center gap-2 bg-[#c7ecce]">
                {formatCurrency(record.datas?.[date]?.bill)}
                <div
                  onClick={() => {
                    setOpenInvoiceDetails(true)
                    setDataDetails({
                      ad_account_id: record.ad_account_id,
                      date: date,
                      currency: record.ad_account.currency
                    })
                  }}
                  className="cursor-pointer">
                  <EyeIcon width={18} height={18} />
                </div>
              </div>
              <div className="row-custom flex items-center justify-between gap-2 bg-[white]">
                {formatCurrency(record.datas?.[date]?.bill_vnd)}
              </div>
            </div>
          </>
        ),
      },
      {
        title: "Xác nhận số liệu",
        key: `xacnhan_${index}`,
        width: 160,
        render: (_, record) => {
          const date_id = record.datas?.[date]?.id
          const currentStatus = selectedStatus[date_id] || record.datas?.[date]?.status;
          return (
            <div className={`px-2 select-${record.datas?.[date]?.id}`}>
              <Select
                options={options}
                onChange={(value) => onChangeStatus(value, record.datas?.[date]?.id)}
                size="large"
                id={`select-${record.datas?.[date]?.id}`}
                defaultValue={record.datas?.[date]?.status}
                className={`w-full ${getBackgroundColor(currentStatus)}`}
                placeholder="Select..."
                disabled={!record.datas?.[date]?.status}
              />
            </div>
          )
        },
      },
    ]
  }));
};

