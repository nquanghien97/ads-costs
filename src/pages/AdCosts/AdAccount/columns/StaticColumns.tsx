import { TableColumnsType } from "antd";
import { AdAccountData } from "../../../../dto/AdsBillingsDTO";
import { formatCurrency } from "../../../../utils/currency";
import ArrowRight from "../../../../assets/icons/ArrowRight";
import ArrowLeft from "../../../../assets/icons/ArrowLeft";

export const StaticColumns = ( onExpandColumns: () => void, expandColumns: boolean ): TableColumnsType<AdAccountData> => (
  [
    {
      title: 'Loại TK',
      dataIndex: 'ad_account',
      width: 100,
      key: '1',
      fixed: 'left',
      render(value) {
        return value.type
      }
    },
    {
      title: 'Mã TKQC',
      dataIndex: 'ad_account',
      key: '2',
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
      key: '3',
      fixed: 'left',
      render(value) {
        return value.channel
      }
    },
    {
      title: 'ID TKQC',
      dataIndex: 'ad_account',
      key: '4',
      width: 150,
      fixed: 'left',
      render(value) {
        return value.account_id
      }
    },
    {
      title: 'Tiền tệ',
      dataIndex: 'ad_account',
      key: '5',
      width: 80,
      fixed: 'left',
      render(value) {
        return value.currency
      },
    },
    {
      title: (<div className="flex"><p className="mr-2">Múi giờ</p><div className="cursor-pointer flex justify-center items-center" onClick={onExpandColumns}>{expandColumns ? <ArrowLeft color="white" width={32} height={32} /> : <ArrowRight width={32} height={32} color="white" />}</div></div>),
      dataIndex: 'ad_account',
      key: '6',
      width: 100,
      fixed: 'left',
      render(value) {
        return value.timezone
      },
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
      title: 'Phí thuê',
      dataIndex: 'ad_account',
      width: 100,
      key: '8',
      fixed: 'left',
      render(value) {
        return `${value.rental_fee} %`
      }
    },
    {
      title: 'Tỷ giá TKQC thuê',
      dataIndex: 'ad_account',
      width: 100,
      key: '9',
      fixed: 'left',
      render(value) {
        return formatCurrency(value.exchange_rate, 0)
      }
    },
    {
      title: 'Trạng thái TKQC',
      dataIndex: 'ad_account',
      width: 100,
      key: '10',
      fixed: 'left',
      render(value) {
        return value.status
      }
    },
    {
      title: 'Số liệu',
      width: 100,
      key: '11',
      fixed: 'left',
      render: () => (
        <div>
          <div className="row-custom">TKQC</div>
          <div className="row-custom">VNĐ</div>
        </div>
      ),
    },
    {
      title: 'Tổng CPQC',
      dataIndex: 'ad_account',
      width: 200,
      key: '12',
      render(_, value) {
        return (
          <div>
            <div className="row-custom">{formatCurrency(value.total_ads)}</div>
            <div className="row-custom">{formatCurrency(value.total_ads_vnd)}</div>
          </div>
        )
      },
      className: '!bg-[#ebd1b2] !text-[black]'
    },
    {
      title: 'Tổng hóa đơn',
      dataIndex: 'ad_account',
      width: 200,
      key: '13',
      render(_, value) {
        return (
          <div>
            <div className="row-custom">{formatCurrency(value.total_bill)}</div>
            <div className="row-custom">{formatCurrency(value.total_bill_vnd)}</div>
          </div>
        )
      },
      className: '!bg-[#ebd1b2] !text-[black]'
    },
  ]
)

// export const StaticColumns:  = 
