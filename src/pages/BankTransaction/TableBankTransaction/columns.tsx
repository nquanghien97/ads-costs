import { TableColumnsType } from 'antd';
import { DailyData, ListItem } from '../../../dto/BankBillingsDTO';
import EyeIcon from '../../../assets/icons/EyeIcon';

export const staticColumns: TableColumnsType<ListItem> =  [
  {
    title: 'Mã TKNH',
    // dataIndex: ['bank_account', 'id'],
    key: '1',
    width: 100,
    fixed: 'left',
    render: (_, record) => (
      <div className="flex flex-col">
        {record.group_datas.flatMap((data) => data.bank_account_datas.flatMap(innerData => (
          <tr className="ant-table-cell ant-table-cell-fix-left flex justify-center items-center">
            <td>{innerData.bank_account_id}</td>
          </tr>
        )))}
      </div>
    ),
  },
  {
    title: 'Họ tên',
    // dataIndex: ['bank_account', 'user', 'name'],
    width: 100,
    key: '2',
    fixed: 'left',
    render: (_, record) => (
      <div className="flex flex-col">
        {record.group_datas.flatMap((data) => data.bank_account_datas.flatMap(innerData => (
          <tr className="ant-table-cell ant-table-cell-fix-left flex justify-center items-center">
            <td>{innerData.bank_account.user.name}</td>
          </tr>
        )))}
      </div>
    ),
  },
  {
    title: 'STK Ngân hàng',
    // dataIndex: ['bank_account', 'card_number'],
    key: '3',
    width: 100,
    fixed: 'left',
    render: (_, record) => (
      <div className="flex flex-col">
        {record.group_datas.flatMap((data) => data.bank_account_datas.flatMap(innerData => (
          <tr className="ant-table-cell ant-table-cell-fix-left flex justify-center items-center">
            <td>{innerData.bank_account.card_number}</td>
          </tr>
        )))}
      </div>
    ),
  },
  {
    title: 'Bank',
    // dataIndex: ['bank_account', 'bank_name'],
    key: '4',
    width: 100,
    fixed: 'left',
    render: (_, record) => (
      <div className="flex flex-col">
        {record.group_datas.flatMap((data) => data.bank_account_datas.flatMap(innerData => (
          <tr className="ant-table-cell ant-table-cell-fix-left flex justify-center items-center">
            <td>{innerData.bank_account.bank_name}</td>
          </tr>
        )))}
      </div>
    ),
  },
  {
    title: 'Tiền nhận',
    // dataIndex: 'total_received',
    key: '5',
    width: 100,
    fixed: 'left',
    render: (_, record) => (
      <div className="flex flex-col">
        {record.group_datas.flatMap((data) => data.bank_account_datas.flatMap(innerData => (
          <tr className="ant-table-cell ant-table-cell-fix-left flex justify-center items-center">
            <td>{innerData.total_received}</td>
          </tr>
        )))}
      </div>
    ),
  },
  {
    title: 'Tiền thanh toán hóa đơn',
    // dataIndex: 'total_paid_bill',
    width: 100,
    key: '6',
    fixed: 'left',
    render: (_, record) => (
      <div className="flex flex-col">
        {record.group_datas.flatMap((data) => data.bank_account_datas.flatMap(innerData => (
          <tr className="ant-table-cell ant-table-cell-fix-left flex justify-center items-center">
            <td>{innerData.total_paid_bill}</td>
          </tr>
        )))}
      </div>
    ),
  },
  {
    title: 'TT Chi phí khác',
    // dataIndex: 'total_paid_other',
    width: 100,
    key: '7',
    fixed: 'left',
    render: (_, record) => (
      <div className="flex flex-col">
        {record.group_datas.flatMap((data) => data.bank_account_datas.flatMap(innerData => (
          <tr className="ant-table-cell ant-table-cell-fix-left flex justify-center items-center">
            <td>{innerData.total_paid_other}</td>
          </tr>
        )))}
      </div>
    ),
  },
  {
    title: 'Số dư hiện tại',
    // dataIndex: 'balance',
    width: 100,
    key: '8',
    fixed: 'left',
    render: (_, record) => (
      <div className="flex flex-col">
        {record.group_datas.flatMap((data) => data.bank_account_datas.flatMap(innerData => (
          <tr className="ant-table-cell ant-table-cell-fix-left flex justify-center items-center">
            <td>{innerData.balance}</td>
          </tr>
        )))}
      </div>
    ),
  },
];

export const generateDynamicColumns = (datas: { [date: string]: DailyData }, setOpenInvoiceDetails: React.Dispatch<React.SetStateAction<boolean>>): TableColumnsType<ListItem> => {
  const dates = Object.keys(datas);
  return dates.map((date, index) => ({
    title: date,
    children: [
      {
        title: 'Tiền nhận',
        key: `received_${index}`,
        width: 120,
        render: (_, record: ListItem) => (
          <div className="flex flex-col" key={date}>
            {record.group_datas.flatMap((data) => data.bank_account_datas.flatMap(innerData => (
              <tr className="ant-table-cell ant-table-cell-fix-left flex justify-center items-center">
                <td>{innerData.datas[date]?.received}</td>
              </tr>
            )))}
          </div>
        ),
      },
      {
        title: 'TT hóa đơn',
        key: `paid_bill_${index}`,
        width: 120,
        render: (_, record: ListItem) => (
          <div className="flex flex-col" key={date}>
            {record.group_datas.flatMap((data) => data.bank_account_datas.flatMap(innerData => (
              <tr className="ant-table-cell ant-table-cell-fix-left flex justify-center items-center">
                <td>{innerData.datas[date]?.received}</td>
                <div onClick={() => setOpenInvoiceDetails(true)} className="ml-2 p-2 hover:bg-[#e6e5e5] rounded-full duration-300 cursor-pointer">
                  <EyeIcon width={18} height={18} />
                </div>
              </tr>
            )))}
          </div>
        ),
      },
      {
        title: 'TT Chi phí khác',
        key: `paid_other_${index}`,
        width: 160,
        render: (_, record: ListItem) => (
          <div className="flex flex-col" key={date}>
            {record.group_datas.flatMap((data) => data.bank_account_datas.flatMap(innerData => (
              <tr className="ant-table-cell ant-table-cell-fix-left flex justify-center items-center">
                <td>{innerData.datas[date]?.paid_other}</td>
                <div onClick={() => setOpenInvoiceDetails(true)} className="ml-2 p-2 hover:bg-[#e6e5e5] rounded-full duration-300 cursor-pointer">
                  <EyeIcon width={18} height={18}/>
                </div>
              </tr>
            )))}
          </div>
        ),
      },
    ],
  }));
};
