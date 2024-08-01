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
    title: 'Phí thuê',
    dataIndex: 'ad_account',
    width: 100,
    key: '6',
    fixed: 'left',
    render(value) {
      return `${value.rental_fee} %`
    }
  },
  {
    title: 'Tỷ giá TKQC thuê',
    dataIndex: 'ad_account',
    width: 100,
    key: '7',
    fixed: 'left',
    render(value) {
      return value.exchange_rate
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
    },
    className: '!bg-[#e9b9c9] !text-black'
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
    className: '!bg-[#e9b9c9]'
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
    className: '!bg-[#e9b9c9] !text-black'
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
    className: '!bg-[#e9b9c9] !text-black'
  },
];