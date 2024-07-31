import { Select } from 'antd';
import { TableColumnsType } from 'antd';
import { AdAccountData, TotalDailyData } from '../../../../dto/AdsBillingsDTO';
import EyeIcon from '../../../../assets/icons/EyeIcon';
import { formatCurrency } from '../../../../utils/currency';
import { useState } from 'react';
import { useNotification } from '../../../../hooks/useNotification';
import clsx from 'clsx';
import { updateStatusAdsBill } from '../../../../services/ads_bills';

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
  // const [selected, setSelected] = useState({
  //   value: '',
  //   date_id: -1
  // })

  const notification = useNotification()

  const onChangeStatus = async (value: string, date_id: number) => {
    setLoadingTable(true);
    try {
      await updateStatusAdsBill(date_id, value);
      console.log({value, date_id })
      notification.success('Cập nhật trạng thái thành công')
    } catch (err) {
      console.log(err)
    } finally {
      setLoadingTable(false)
    }
  }

  // const bgSelect = (record: AdAccountData, date: string) => {
  //   if (selected.date_id === record.datas[date]?.id) {
  //     if (selected.value === 'Đã XN') return 'w-full [&>*]:!bg-[#0071ba] [&>*]:!text-white';
  //     if (selected.value === 'Sai số') return 'w-full [&>*]:!bg-[#ff4d4f] [&>*]:!text-white';
  //   }
  //   return 'w-full';
  // }

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
        render: (_, record) => (
          <div className="px-2">
            <Select
              options={options}
              onChange={(value) => onChangeStatus(value, record.datas?.[date]?.id)}
              size="large"
              // value={selected.value || record.datas?.[date]?.status}
              defaultValue={record.datas?.[date]?.status}
              className={clsx('w-full')}
              placeholder="Select..."
              allowClear
            />
          </div>
        ),
      },
    ]
  }));
};

