import { Select } from 'antd';
import { TableColumnsType } from 'antd';
import { BankBillingsByDate, BankBillingsDTO } from '../../../dto/BankBillingsDTO';
import EyeIcon from '../../../assets/icons/EyeIcon';

const options = [
  { value: 'da-xac-nhan', label: 'Đã xác nhận' },
  { value: 'sai-so-lieu', label: 'Sai số liệu' },
  { value: 'chua-xin', label: 'Chưa xin' },
];

export const staticColumns: TableColumnsType<BankBillingsDTO> = [
  {
    title: 'Mã TKNH',
    dataIndex: ['bank_account', 'id'],
    key: '1',
    width: 80,
    fixed: 'left',
  },
  {
    title: 'Họ tên',
    dataIndex: ['bank_account', 'user', 'name'],
    width: 80,
    key: '2',
    fixed: 'left',
  },
  {
    title: 'STK Ngân hàng',
    dataIndex: ['bank_account', 'card_number'],
    key: '3',
    width: 80,
    fixed: 'left',
  },
  {
    title: 'Bank',
    dataIndex: ['bank_account', 'bank_name'],
    key: '4',
    width: 80,
    fixed: 'left',
  },
  {
    title: 'Tiền nhận',
    dataIndex: 'total_ads',
    key: '5',
    width: 80,
    fixed: 'left',
  },
  {
    title: 'Tiền thanh toán hóa đơn',
    dataIndex: 'total_bill',
    width: 80,
    key: '6',
    fixed: 'left',
  },
  {
    title: 'TT Chi phí khác',
    dataIndex: 'total_ads_vnd',
    width: 100,
    key: '7',
    fixed: 'left',
  },
  {
    title: 'Số dư hiện tại',
    dataIndex: 'total_ads_vnd',
    width: 100,
    key: '8',
    fixed: 'left',
  },
];

export const generateDynamicColumns = (datas: BankBillingsByDate[], setOpenInvoiceDetails: React.Dispatch<React.SetStateAction<boolean>>): TableColumnsType => {
  return datas.flatMap((data, index) => ({
    title: data.time,
    children: [
      {
        title: 'Tiền nhận',
        key: `ads_${index}`,
        width: 120,
        render: (_, record) => (
          <div key={data.id}>
            <div>{record.datas[index]?.ads}</div>
          </div>
        ),
      },
      {
        title: 'TT hóa đơn',
        key: `bill_${index}`,
        width: 120,
        render: (_, record) => (
          <div key={data.id}>
            <div className="flex items-center justify-between gap-2">
              {record.datas[index]?.bill}
              <div onClick={() => setOpenInvoiceDetails(true)}>
                <EyeIcon width={18} height={18} className="cursor-pointer" />
              </div>
            </div>
          </div>
        ),
      },
      {
        title: 'TT Chi phí khác',
        key: `status_${index}`,
        width: 160,
        render: (_, record) => (
          <Select
            options={options}
            size="large"
            defaultValue={record.datas[index]?.status}
            className="w-full"
            placeholder="Select..."
          />
        ),
      },
    ],
  }));
};





