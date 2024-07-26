import { TableColumnsType } from 'antd';
import { BankTransactionsDTO, TotalDailyData } from '../../../dto/BankTransactionsDTO';
import EyeIcon from '../../../assets/icons/EyeIcon';
import { formatCurrency } from '../../../utils/currency';

export const staticColumns: TableColumnsType<BankTransactionsDTO> =  [
  {
    title: 'Mã TKNH',
    key: '1',
    width: 100,
    fixed: 'left',
    render: (_, record) => (
      <table>
        <tbody>
        {record.group_datas.flatMap((data) => data.bank_account_datas.flatMap(innerData => (
          <tr key={innerData.bank_account.id} className="ant-table-cell ant-table-cell-fix-left flex justify-center items-center">
            <td>{`TKNH${innerData.bank_account.id}`}</td>
          </tr>
        )))}
        </tbody>
      </table>
    ),
  },
  {
    title: 'Họ tên',
    width: 160,
    key: '2',
    fixed: 'left',
    render: (_, record) => (
      <table>
        <tbody>
        {record.group_datas.flatMap((data) => data.bank_account_datas.flatMap(innerData => (
          <tr key={innerData.bank_account.card_number} className="ant-table-cell ant-table-cell-fix-left flex justify-center items-center">
            <td>{innerData.bank_account.name}</td>
          </tr>
        )))}
        </tbody>
      </table>
    ),
  },
  {
    title: 'STK Ngân hàng',
    key: '3',
    width: 220,
    fixed: 'left',
    render: (_, record) => (
      <table>
        <tbody>
          {record.group_datas.flatMap((data) => data.bank_account_datas.flatMap(innerData => (
            <tr key={innerData.bank_account.card_number} className="ant-table-cell ant-table-cell-fix-left flex justify-center items-center">
              <td>{innerData.bank_account.card_number}</td>
            </tr>
          )))}
          </tbody>
      </table>
    ),
  },
  {
    title: 'Bank',
    key: '4',
    width: 150,
    fixed: 'left',
    render: (_, record) => (
      <table>
        <tbody>

          {record.group_datas.flatMap((data) => data.bank_account_datas.flatMap(innerData => (
            <tr key={innerData.bank_account.card_number} className="ant-table-cell ant-table-cell-fix-left flex justify-center items-center">
              <td>{innerData.bank_account.bank_name}</td>
            </tr>
          )))}
          </tbody>
      </table>
    ),
  },
  {
    title: 'Tiền nhận',
    key: '5',
    width: 150,
    fixed: 'left',
    render: (_, record) => (
      <table>
        <tbody>
          {record.group_datas.flatMap((data) => data.bank_account_datas.flatMap(innerData => (
            <tr key={innerData.bank_account.card_number} className="ant-table-cell ant-table-cell-fix-left flex justify-center items-center">
              <td>{formatCurrency(innerData.total_received)}</td>
            </tr>
          )))}
          </tbody>
      </table>
    ),
  },
  {
    title: 'Tiền thanh toán hóa đơn',
    width: 150,
    key: '6',
    fixed: 'left',
    render: (_, record) => (
      <table>
        <tbody>

          {record.group_datas.flatMap((data) => data.bank_account_datas.flatMap(innerData => (
            <tr key={innerData.bank_account.card_number} className="ant-table-cell ant-table-cell-fix-left flex justify-center items-center">
              <td>{formatCurrency(innerData.total_paid_bill)}</td>
            </tr>
          )))}
          </tbody>
      </table>
    ),
  },
  {
    title: 'TT Chi phí khác',
    width: 150,
    key: '7',
    fixed: 'left',
    render: (_, record) => (
      <table>
        <tbody>

          {record.group_datas.flatMap((data) => data.bank_account_datas.flatMap(innerData => (
            <tr key={innerData.bank_account.card_number} className="ant-table-cell ant-table-cell-fix-left flex justify-center items-center">
              <td>{formatCurrency(innerData.total_paid_other)}</td>
            </tr>
          )))}
          </tbody>
      </table>
    ),
  },
  {
    title: 'Số dư hiện tại',
    width: 150,
    key: '8',
    fixed: 'left',
    render: (_, record) => (
      <table>
        <tbody>

          {record.group_datas.flatMap((data) => data.bank_account_datas.flatMap(innerData => (
            <tr key={innerData.bank_account.card_number} className="ant-table-cell ant-table-cell-fix-left flex justify-center items-center">
              <td>{formatCurrency(innerData?.balance)}</td>
            </tr>
          )))}
          </tbody>
      </table>
    ),
  },
];

export const generateDynamicColumns = (datas: TotalDailyData, setOpenInvoiceDetails: React.Dispatch<React.SetStateAction<boolean>>): TableColumnsType<BankTransactionsDTO> => {
  const dates = Object.keys(datas);
  return dates.map((date, index) => ({
    title: date,
    children: [
      {
        title: 'Tiền nhận',
        key: `received_${index}`,
        width: 160,
        render: (_, record) => (
          <table>
            <tbody>
            {record.group_datas.flatMap((data) => data.bank_account_datas.flatMap(innerData => (
              <tr key={innerData.bank_account.card_number} className="ant-table-cell ant-table-cell-fix-left flex justify-center items-center">
                <td>{formatCurrency(innerData.datas[date]?.received)}</td>
              </tr>
            )))}
            </tbody>
          </table>
        ),
      },
      {
        title: 'TT hóa đơn',
        key: `paid_bill_${index}`,
        width: 160,
        render: (_, record: BankTransactionsDTO) => (
          <table>
            <tbody>
            {record.group_datas.flatMap((data) => data.bank_account_datas.flatMap(innerData => (
              <tr key={innerData.bank_account.card_number} className="ant-table-cell ant-table-cell-fix-left flex justify-center items-center">
                <td>{formatCurrency(innerData.datas[date]?.paid_bill)}</td>
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
        render: (_, record: BankTransactionsDTO) => (
          <table>
            <tbody>

            {record.group_datas.flatMap((data) => data.bank_account_datas.flatMap(innerData => (
              <tr key={innerData.bank_account.card_number} className="ant-table-cell ant-table-cell-fix-left flex justify-center items-center">
                <td>{formatCurrency(innerData.datas[date]?.paid_other)}</td>
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
