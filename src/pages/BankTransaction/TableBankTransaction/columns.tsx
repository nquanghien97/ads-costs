import { TableColumnsType } from 'antd';
import { BankBillings, TotalDailyData } from '../../../dto/BankBillingsDTO';
import EyeIcon from '../../../assets/icons/EyeIcon';

export const staticColumns: TableColumnsType<BankBillings> =  [
  {
    title: 'Mã TKNH',
    // dataIndex: ['bank_account', 'id'],
    key: '1',
    width: 100,
    fixed: 'left',
    render: (_, record) => (
      <table>
        <tbody>
        {record.group_datas.flatMap((data) => data.bank_account_datas.flatMap(innerData => (
          <tr key={innerData.bank_account_id} className="ant-table-cell ant-table-cell-fix-left flex justify-center items-center">
            <td>{innerData.bank_account_id}</td>
          </tr>
        )))}
        </tbody>
      </table>
    ),
  },
  {
    title: 'Họ tên',
    // dataIndex: ['bank_account', 'user', 'name'],
    width: 100,
    key: '2',
    fixed: 'left',
    render: (_, record) => (
      <table>
        <tbody>

        {record.group_datas.flatMap((data) => data.bank_account_datas.flatMap(innerData => (
          <tr key={innerData.bank_account_id} className="ant-table-cell ant-table-cell-fix-left flex justify-center items-center">
            <td>{innerData.bank_account.user.name}</td>
          </tr>
        )))}
        </tbody>
      </table>
    ),
  },
  {
    title: 'STK Ngân hàng',
    // dataIndex: ['bank_account', 'card_number'],
    key: '3',
    width: 100,
    fixed: 'left',
    render: (_, record) => (
      <table>
        <tbody>

          {record.group_datas.flatMap((data) => data.bank_account_datas.flatMap(innerData => (
            <tr key={innerData.bank_account_id} className="ant-table-cell ant-table-cell-fix-left flex justify-center items-center">
              <td>{innerData.bank_account.card_number}</td>
            </tr>
          )))}
          </tbody>
      </table>
    ),
  },
  {
    title: 'Bank',
    // dataIndex: ['bank_account', 'bank_name'],
    key: '4',
    width: 100,
    fixed: 'left',
    render: (_, record) => (
      <table>
        <tbody>

          {record.group_datas.flatMap((data) => data.bank_account_datas.flatMap(innerData => (
            <tr key={innerData.bank_account_id} className="ant-table-cell ant-table-cell-fix-left flex justify-center items-center">
              <td>{innerData.bank_account.bank_name}</td>
            </tr>
          )))}
          </tbody>
      </table>
    ),
  },
  {
    title: 'Tiền nhận',
    // dataIndex: 'total_received',
    key: '5',
    width: 100,
    fixed: 'left',
    render: (_, record) => (
      <table>
        <tbody>

          {record.group_datas.flatMap((data) => data.bank_account_datas.flatMap(innerData => (
            <tr key={innerData.bank_account_id} className="ant-table-cell ant-table-cell-fix-left flex justify-center items-center">
              <td>{innerData.total_received}</td>
            </tr>
          )))}
          </tbody>
      </table>
    ),
  },
  {
    title: 'Tiền thanh toán hóa đơn',
    // dataIndex: 'total_paid_bill',
    width: 100,
    key: '6',
    fixed: 'left',
    render: (_, record) => (
      <table>
        <tbody>

          {record.group_datas.flatMap((data) => data.bank_account_datas.flatMap(innerData => (
            <tr key={innerData.bank_account_id} className="ant-table-cell ant-table-cell-fix-left flex justify-center items-center">
              <td>{innerData.total_paid_bill}</td>
            </tr>
          )))}
          </tbody>
      </table>
    ),
  },
  {
    title: 'TT Chi phí khác',
    // dataIndex: 'total_paid_other',
    width: 100,
    key: '7',
    fixed: 'left',
    render: (_, record) => (
      <table>
        <tbody>

          {record.group_datas.flatMap((data) => data.bank_account_datas.flatMap(innerData => (
            <tr key={innerData.bank_account_id} className="ant-table-cell ant-table-cell-fix-left flex justify-center items-center">
              <td>{innerData.total_paid_other}</td>
            </tr>
          )))}
          </tbody>
      </table>
    ),
  },
  {
    title: 'Số dư hiện tại',
    // dataIndex: 'balance',
    width: 100,
    key: '8',
    fixed: 'left',
    render: (_, record) => (
      <table>
        <tbody>

          {record.group_datas.flatMap((data) => data.bank_account_datas.flatMap(innerData => (
            <tr key={innerData.bank_account_id} className="ant-table-cell ant-table-cell-fix-left flex justify-center items-center">
              <td>{innerData.balance}</td>
            </tr>
          )))}
          </tbody>
      </table>
    ),
  },
];

export const generateDynamicColumns = (datas: TotalDailyData, setOpenInvoiceDetails: React.Dispatch<React.SetStateAction<boolean>>): TableColumnsType<BankBillings> => {
  const dates = Object.keys(datas);
  return dates.map((date, index) => ({
    title: date,
    children: [
      {
        title: 'Tiền nhận',
        key: `received_${index}`,
        width: 120,
        render: (_, record) => (
          <table>
            <tbody>
            {record.group_datas.flatMap((data) => data.bank_account_datas.flatMap(innerData => (
              <tr key={innerData.bank_account_id} className="ant-table-cell ant-table-cell-fix-left flex justify-center items-center">
                <td>{innerData.datas[date]?.received}</td>
              </tr>
            )))}
            </tbody>
          </table>
        ),
      },
      {
        title: 'TT hóa đơn',
        key: `paid_bill_${index}`,
        width: 120,
        render: (_, record: BankBillings) => (
          <table>
            <tbody>
            {record.group_datas.flatMap((data) => data.bank_account_datas.flatMap(innerData => (
              <tr key={innerData.bank_account_id} className="ant-table-cell ant-table-cell-fix-left flex justify-center items-center">
                <td>{innerData.datas[date]?.received}</td>
                <td onClick={() => setOpenInvoiceDetails(true)} className="ml-2 p-2 hover:bg-[#e6e5e5] rounded-full duration-300 cursor-pointer">
                  <EyeIcon width={18} height={18} />
                </td>
              </tr>
            )))}
            </tbody>
          </table>
        ),
      },
      {
        title: 'TT Chi phí khác',
        key: `paid_other_${index}`,
        width: 160,
        render: (_, record: BankBillings) => (
          <table>
            <tbody>

            {record.group_datas.flatMap((data) => data.bank_account_datas.flatMap(innerData => (
              <tr key={innerData.bank_account_id} className="ant-table-cell ant-table-cell-fix-left flex justify-center items-center">
                <td>{innerData.datas[date]?.paid_other}</td>
                <td onClick={() => setOpenInvoiceDetails(true)} className="ml-2 p-2 hover:bg-[#e6e5e5] rounded-full duration-300 cursor-pointer">
                  <EyeIcon width={18} height={18}/>
                </td>
              </tr>
            )))}
            </tbody>
          </table>
        ),
      },
    ],
  }));
};
