import { TableColumnsType } from "antd";
import { AdAccountData } from "../../../../dto/AdsBillingsDTO";
import { formatCurrency } from "../../../../utils/currency";

export const StaticColumns: TableColumnsType<AdAccountData> = [
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
    width: 150,
    key: '7',
    fixed: 'left',
    render(value) {
      return <div className="flex flex-col">
        <p>{value?.bank_account?.bank_name || 'Chưa liên kết'}</p>
        {value?.bank_account?.card_number && <p>{`( ${value?.bank_account?.card_number} )`}</p>}
        
      </div>
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
        <div className="row-custom bg-[white]">VNĐ</div>
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
