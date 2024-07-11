import { Select } from 'antd';
import { TableColumnsType } from 'antd';
import { DailyAdsBillings, AdsBillingsDTO } from '../../../dto/AdsBillingsDTO';
import EyeIcon from '../../../assets/icons/EyeIcon';

const options = [
  { value: 'da-xac-nhan', label: 'Đã xác nhận' },
  { value: 'sai-so-lieu', label: 'Sai số liệu' },
  { value: 'chua-xin', label: 'Chưa xin' },
];

export const staticColumns: TableColumnsType<AdsBillingsDTO> = [
  {
    title: 'Mã TKQC',
    dataIndex: 'ad_account',
    key: '1',
    width: 80,
    fixed: 'left',
    render(value) {
      return value.account_id
    }
  },
  {
    title: 'Kênh chạy',
    dataIndex: 'ad_account',
    width: 80,
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
    width: 80,
    fixed: 'left',
    render(value) {
      return value.id
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
    width: 80,
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
      return value.bank_account.bank_name
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
    width: 80,
    key: '9',
    fixed: 'left',
    render: () => (
      <div>
        <div className="row-custom">TKQC</div>
        <div className="row-custom">VND</div>
      </div>
    ),
  },
  {
    title: 'Tổng CPQC',
    dataIndex: 'ad_account',
    width: 100,
    key: '10',
    fixed: 'left',
    render(_, value) {
      return (
        <div>
          <div className="row-custom">{value.total_ads}</div>
          <div className="row-custom">{value.total_ads_vnd}</div>
        </div>
      )
    },
  },
  {
    title: 'Tổng hóa đơn',
    dataIndex: 'ad_account',
    width: 100,
    key: '11',
    fixed: 'left',
    render(_, value) {
      return (
        <div>
          <div className="row-custom">{value.total_bill}</div>
          <div className="row-custom">{value.total_bill_vnd}</div>
        </div>
      )
    }
  },
];

const onChangeStatus = (value: string, id: number) => {
  console.log({ value, id });
}

export const generateDynamicColumns = (datas: DailyAdsBillings[], setOpenInvoiceDetails: React.Dispatch<React.SetStateAction<boolean>>): TableColumnsType<AdsBillingsDTO> => {
  return datas.flatMap((data, index) => ({
    title: data.time,
    children: [
      {
        title: `Tổng CPQC`,
        key: `ads_${index}`,
        width: 120,
        render: (_, record) => (
          <div key={data.id}>
            <div className="row-custom">{record.datas[index].ads}</div>
            <div className="row-custom">{record.datas[index].ads_vnd}</div>
          </div>
        ),
      },
      {
        title: `Tổng hóa đơn`,
        key: `bill_${index}`,
        width: 140,
        render: (_, record) => (
          <div key={data.id}>
            <div className="row-custom flex items-center gap-2">
              {record.datas[index].bill}
              <div onClick={() => setOpenInvoiceDetails(true)} className="cursor-pointer">
                <EyeIcon width={18} height={18} />
              </div>
            </div>
            <div className="row-custom flex items-center justify-between gap-2">
              {record.datas[index].bill_vnd}
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
              defaultValue={record.datas[index].status}
              className="w-full"
              placeholder="Select..."
            />
          </div>
        ),
      },
    ]
  }));
};

