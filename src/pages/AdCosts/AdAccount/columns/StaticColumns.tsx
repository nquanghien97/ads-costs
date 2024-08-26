import { TableColumnsType } from "antd";
import { AdAccountData, GroupData } from "../../../../dto/AdsBillingsDTO";
import { formatCurrency } from "../../../../utils/currency";
import ArrowRight from "../../../../assets/icons/ArrowRight";
import ArrowLeft from "../../../../assets/icons/ArrowLeft";

export const StaticColumns = (onExpandColumns: () => void, expandColumns: boolean): TableColumnsType<AdAccountData> => {
  return [
    {
      title: 'Loại TK',
      dataIndex: 'group_datas',
      width: 100,
      key: '1',
      fixed: 'left',
      render(value: GroupData[]) {
        return value.map(item => item.user_datas.map(item => item.ad_account_datas.map(a => a.ad_account.type))).flat(3)
      }
    },
    {
      title: 'Mã TKQC',
      dataIndex: 'ad_account',
      key: '2',
      width: 100,
      fixed: 'left',
      render(value: GroupData[]) {
        return <span>{`TK${value.map(item => item.user_datas.map(item => item.ad_account_datas.map(a => a.ad_account.id)))}`}</span>
      }
    },
    {
      title: 'Kênh chạy',
      dataIndex: 'ad_account',
      width: 100,
      key: '3',
      fixed: 'left',
      render(value: GroupData[]) {
        return value.map(item => item.user_datas.map(item => item.ad_account_datas.map(a => a.ad_account.channel)))
      }
    },
    {
      title: 'ID TKQC',
      dataIndex: 'ad_account',
      key: '4',
      width: 150,
      fixed: 'left',
      render(value: GroupData[]) {
        return value.map(item => item.user_datas.map(item => item.ad_account_datas.map(a => a.ad_account.account_id)))
      }
    },
    {
      title: 'Tiền tệ',
      dataIndex: 'ad_account',
      key: '5',
      width: 80,
      fixed: 'left',
      render(value: GroupData[]) {
        return value.map(item => item.user_datas.map(item => item.ad_account_datas.map(a => a.ad_account.currency)))
      },
    },
    {
      title: (<div className="flex"><p className="mr-2">Múi giờ</p><div className="cursor-pointer flex justify-center items-center" onClick={onExpandColumns}>{expandColumns ? <ArrowLeft color="white" width={32} height={32} /> : <ArrowRight width={32} height={32} color="white" />}</div></div>),
      dataIndex: 'ad_account',
      key: '6',
      width: 100,
      fixed: 'left',
      render(value: GroupData[]) {
        return value.map(item => item.user_datas.map(item => item.ad_account_datas.map(a => a.ad_account.timezone)))
      },
    },
    {
      title: 'Bank LK TKQC',
      dataIndex: 'ad_account',
      width: 150,
      key: '7',
      fixed: 'left',
      render(value: GroupData[]) {
        return <div className="flex flex-col">
          <p>{value.map(item => item.user_datas.map(item => item.ad_account_datas.map(a => a.ad_account.bank_account.bank_name))) || 'Chưa liên kết'}</p>
          {value.map(item => item.user_datas.map(item => item.ad_account_datas.map(a => a.ad_account.bank_account.card_number)))}

        </div>
      }
    },
    {
      title: 'Phí thuê',
      dataIndex: 'ad_account',
      width: 100,
      key: '8',
      fixed: 'left',
      render(value: GroupData[]) {
        return `${value.map(item => item.user_datas.map(item => item.ad_account_datas.map(a => a.ad_account.rental_fee)))} %`
      }
    },
    {
      title: 'Tỷ giá TKQC thuê',
      dataIndex: 'ad_account',
      width: 100,
      key: '9',
      fixed: 'left',
      render(value: GroupData[]) {
        return formatCurrency(value.map(item => item.user_datas.map(item => item.ad_account_datas.map(a => a.ad_account.exchange_rate))), 0)
      }
    },
    {
      title: 'Trạng thái TKQC',
      dataIndex: 'ad_account',
      width: 100,
      key: '10',
      fixed: 'left',
      render(value: GroupData[]) {
        return value.map(item => item.user_datas.map(item => item.ad_account_datas.map(a => a.ad_account.status)))
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
    }
  ]

}

// export const StaticColumns:  = 
