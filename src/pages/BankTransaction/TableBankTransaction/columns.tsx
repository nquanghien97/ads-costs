import { TableColumnsType } from 'antd';
import { DailyData, BankAccountData } from '../../../dto/BankBillingsDTO';
import EyeIcon from '../../../assets/icons/EyeIcon';

export const staticColumns: TableColumnsType<BankAccountData> = [
  {
    title: 'Mã TKNH',
    dataIndex: ['bank_account', 'id'],
    key: '1',
    width: 100,
    fixed: 'left',
  },
  {
    title: 'Họ tên',
    dataIndex: ['bank_account', 'user', 'name'],
    width: 100,
    key: '2',
    fixed: 'left',
  },
  {
    title: 'STK Ngân hàng',
    dataIndex: ['bank_account', 'card_number'],
    key: '3',
    width: 100,
    fixed: 'left',
  },
  {
    title: 'Bank',
    dataIndex: ['bank_account', 'bank_name'],
    key: '4',
    width: 100,
    fixed: 'left',
  },
  {
    title: 'Tiền nhận',
    dataIndex: 'total_received',
    key: '5',
    width: 100,
    fixed: 'left',
  },
  {
    title: 'Tiền thanh toán hóa đơn',
    dataIndex: 'total_paid_bill',
    width: 100,
    key: '6',
    fixed: 'left',
  },
  {
    title: 'TT Chi phí khác',
    dataIndex: 'total_paid_other',
    width: 100,
    key: '7',
    fixed: 'left',
  },
  {
    title: 'Số dư hiện tại',
    dataIndex: 'balance',
    width: 100,
    key: '8',
    fixed: 'left',
  },
];

export const generateDynamicColumns = (datas: { [date: string]: DailyData }, setOpenInvoiceDetails: React.Dispatch<React.SetStateAction<boolean>>): TableColumnsType => {
  const dates = Object.keys(datas);
  return dates.map((date, index) => ({
    title: date,
    children: [
      {
        title: 'Tiền nhận',
        key: `received_${index}`,
        width: 120,
        render: (_, record: BankAccountData) => (
          <div key={date}>
            <div>{record.datas[date]?.received}</div>
          </div>
        ),
      },
      {
        title: 'TT hóa đơn',
        key: `paid_bill_${index}`,
        width: 120,
        render: (_, record: BankAccountData) => (
          <div key={date}>
            <div className="flex items-center justify-between gap-2">
              {record.datas[date]?.paid_bill}
              <div onClick={() => setOpenInvoiceDetails(true)}>
                <EyeIcon width={18} height={18} className="cursor-pointer" />
              </div>
            </div>
          </div>
        ),
      },
      {
        title: 'TT Chi phí khác',
        key: `paid_other_${index}`,
        width: 160,
        render: (_, record: BankAccountData) => (
          <div key={date}>
            <div className="flex items-center justify-between gap-2">
              {record.datas[date]?.paid_other}
              <div onClick={() => setOpenInvoiceDetails(true)}>
                <EyeIcon width={18} height={18} className="cursor-pointer" />
              </div>
            </div>
          </div>
        ),
      },
    ],
  }));
};
