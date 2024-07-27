import { Select } from 'antd';
import { TableColumnsType } from 'antd';
import { AdAccountData, TotalDailyData } from '../../../dto/AdsBillingsDTO';
import EyeIcon from '../../../assets/icons/EyeIcon';
import { formatCurrency } from '../../../utils/currency';

const options = [
  { value: 'da-xac-nhan', label: 'Đã xác nhận' },
  { value: 'sai-so-lieu', label: 'Sai số liệu' },
  { value: 'chua-xin', label: 'Chưa xin' },
];

export const staticColumns: TableColumnsType<AdAccountData> = [
  {
    title: 'Mã TKQC',
    dataIndex: 'ad_account',
    key: '1',
    width: 100,
    fixed: 'left',
    render(value) {
      return <span>{`TK${value.id}`}</span>
    }
  },
  {
    title: 'Kênh chạy',
    dataIndex: 'ad_account',
    width: 100,
    key: '2',
    fixed: 'left',
    render(value) {
      return value.channel
    }
  },
  {
    title: 'ID TKQC',
    dataIndex: 'ad_account',
    key: '3',
    width: 150,
    fixed: 'left',
    render(value) {
      return value.account_id
    }
  },
  {
    title: 'Tiền tệ',
    dataIndex: 'ad_account',
    key: '4',
    width: 80,
    fixed: 'left',
    render(value) {
      return value.currency
    },
  },
  {
    title: 'Múi giờ',
    dataIndex: 'ad_account',
    key: '5',
    width: 80,
    fixed: 'left',
    render(value) {
      return value.timezone
    },
  },
  {
    title: 'Loại TK',
    dataIndex: 'ad_account',
    width: 100,
    key: '6',
    fixed: 'left',
    render(value) {
      return value.type
    }
  },
  {
    title: 'Bank LK TKQC',
    dataIndex: 'ad_account',
    width: 100,
    key: '7',
    fixed: 'left',
    render(value) {
      return value?.bank_account?.bank_name
    }
  },
  {
    title: 'Trạng thái TKQC',
    dataIndex: 'ad_account',
    width: 100,
    key: '8',
    fixed: 'left',
    render(value) {
      return value.status
    }
  },
  {
    title: 'Số liệu',
    width: 100,
    key: '9',
    fixed: 'left',
    render: () => (
      <div>
        <div className="row-custom bg-[#c7ecce]">TKQC</div>
        <div className="row-custom bg-[white]">VND</div>
      </div>
    ),
  },
  {
    title: 'Tổng CPQC',
    dataIndex: 'ad_account',
    width: 200,
    key: '10',
    render(_, value) {
      return (
        <div>
          <div className="row-custom bg-[#c7ecce]">{formatCurrency(value.total_ads)}</div>
          <div className="row-custom bg-[white]">{formatCurrency(value.total_ads_vnd)}</div>
        </div>
      )
    },
    className: '!bg-[#ebd1b2] !text-[black]'
  },
  {
    title: 'Tổng hóa đơn',
    dataIndex: 'ad_account',
    width: 200,
    key: '11',
    render(_, value) {
      return (
        <div>
          <div className="row-custom bg-[#c7ecce]">{formatCurrency(value.total_bill)}</div>
          <div className="row-custom bg-[white]">{formatCurrency(value.total_bill_vnd)}</div>
        </div>
      )
    },
    className: '!bg-[#ebd1b2] !text-[black]'
  },
];

const onChangeStatus = (value: string, id: number) => {
  console.log({ value, id });
}

export const generateDynamicColumns = (datas: TotalDailyData, setOpenInvoiceDetails: React.Dispatch<React.SetStateAction<boolean>>): TableColumnsType<AdAccountData> => {
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
              onChange={(value) => onChangeStatus(value, record.ad_account.id)}
              size="large"
              defaultValue={record.datas?.[date]?.status}
              className="w-full"
              placeholder="Select..."
            />
          </div>
        ),
      },
    ]
  }));
};

