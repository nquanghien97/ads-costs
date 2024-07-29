import { Select } from 'antd';
import { TableColumnsType } from 'antd';
import { AdAccountData, TotalDailyData } from '../../../../dto/AdsBillingsDTO';
import EyeIcon from '../../../../assets/icons/EyeIcon';
import { formatCurrency } from '../../../../utils/currency';
import { useState } from 'react';

const options = [
  { value: 'Đã XN', label: 'Đã XN' },
  { value: 'Sai số', label: 'Sai số' },
  { value: 'Chưa xin', label: 'Chưa xin' },
];


const bgSelect = (value: string) => {
  if (value === 'Đã XN') return `w-full [&>*]:!bg-[#0071ba] [&>*]:!text-white`
  if (value === 'Sai số') return 'w-full [&>*]:!bg-[#ff4d4f] [&>*]:!text-white'
  return 'w-full'
}

const onChangeStatus = (value: string, id: number) => {
  console.log({ value, id });
}

export const GenerateDynamicColumns = (datas: TotalDailyData, setOpenInvoiceDetails: React.Dispatch<React.SetStateAction<boolean>>): TableColumnsType<AdAccountData> => {
  const [selected, setSelected] = useState('')
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
          <div>
            <div className="row-custom flex items-center gap-2 bg-[#c7ecce]">
              {formatCurrency(record.datas?.[date]?.bill)}
              <div onClick={() => setOpenInvoiceDetails(true)} className="cursor-pointer">
                <EyeIcon width={18} height={18} />
              </div>
            </div>
            <div className="row-custom flex items-center justify-between gap-2 bg-[white]">
              {formatCurrency(record.datas?.[date]?.bill_vnd)}
            </div>
          </div>
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
              onChange={(value) => {
                setSelected(value)
                onChangeStatus(value, record.ad_account.id)}
              }
              size="large"
              defaultValue={record.datas?.[date]?.status}
              className={bgSelect(selected)}
              placeholder="Select..."
            />
          </div>
        ),
      },
    ]
  }));
};

