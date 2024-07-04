import type { ColumnsType } from 'rc-table';
import Table from 'rc-table';
import { AdsBillingsDTO } from '../../../dto/AdsBillingsDTO';

const columns: ColumnsType<AdsBillingsDTO> = [
  {
    title: 'Mã TKQC',
    dataIndex: 'ad_account',
    minWidth: 100,
    key: '1',
    render(value) {
      return value.account_id
    }
  },
  {
    title: 'Kênh chạy',
    dataIndex: 'ad_account',
    width: 100,
    key: '2',
    render(value) {
      return value.channel
    }
  },
  {
    title: 'ID TKQC',
    dataIndex: 'ad_account',
    minWidth: 100,
    key: '3',
    render(value) {
      return value.id
    }
  },
  {
    title: 'Tiền tệ',
    dataIndex: 'ad_account',
    minWidth: 100,
    key: '4',
    render(value) {
      return value.currency
    }
  },
  {
    title: 'Múi giờ',
    dataIndex: 'ad_account',
    minWidth: 50,
    key: '5',
    render(value) {
      return value.timezone
    }
  },
  {
    title: 'Loại TK',
    dataIndex: 'ad_account',
    width: 100,
    key: '6',
    render(value) {
      return value.type
    }
  },
  {
    title: 'Bank LK TKQC',
    dataIndex: 'ad_account',
    width: 100,
    key: '7',
    render(value) {
      return value.bank_account.bank_name
    }
  },
  {
    title: 'Trạng thái TKQC',
    dataIndex: 'ad_account',
    width: 100,
    key: '8',
    render(value) {
      return value.status
    }
  },
  {
    title: 'Số liệu',
    // dataIndex: 'soLieu',
    width: 200,
    key: '9',
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
    width: 200,
    key: '10',
    render(_, value) {
      return (
        <div>
          <div className="row-custom">{value.total_ads}</div>
          <div className="row-custom">{value.total_ads_vnd}</div>
        </div>
      )
    }
  },
  {
    title: 'Tổng hóa đơn',
    dataIndex: 'ad_account',
    width: 200,
    key: '11',
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

function TotalInvoice(props: { data: AdsBillingsDTO[] }) {
  const { data } = props;
  return (
    <div className="relative">
      <div className="px-6 py-2 my-2 rounded-full h-10 text-white top-0 z-50 flex"></div>
      <Table columns={columns} data={data} rowKey={(record) => record.ad_account_id}  />
    </div>
  )
}

export default TotalInvoice;