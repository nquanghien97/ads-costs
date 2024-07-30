import { ConfigProvider, Modal, Table, TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import { getAdsBillDetails } from "../../../services/ads_bills";
import { convertToDate, formatDate } from "../../../utils/date";
interface InvoiceDetailsProps {
  onClose: () => void;
  open: boolean;
  dataDetails: {
    ad_account_id: number;
    date: string;
  }
}

const columns: TableColumnsType = [
  {
    title: 'ID GIAO DỊCH',
    key: '1',
    dataIndex: 'billing_id'
  },
  {
    title: 'NGÀY',
    key: '2',
    dataIndex: 'date'
  },
  {
    title: 'SỐ TIỀN',
    key: '3',
    dataIndex: 'amount'
  },
  {
    title: 'PTTT',
    key: '4',
    dataIndex: 'payment_method'
  },
  {
    title: 'MÃ THAM CHIẾU',
    key: '5',
    dataIndex: 'refer_code'
  }
]

function InvoiceDetails(props: InvoiceDetailsProps) {
  const { onClose, open, dataDetails } = props;
  const dateBill = formatDate(convertToDate(dataDetails.date))
  const [dataBillDetails, setDataBillDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(dataDetails)
  useEffect(() => {
    setLoading(true);
    (async () => {
      const res = await getAdsBillDetails({since: dateBill, until: dateBill, ad_account_id: dataDetails.ad_account_id})
      setDataBillDetails(res.data.data.list)
      setLoading(false)
    })()
  }, [dataDetails.ad_account_id, dateBill]);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={false}
      className="!w-2/3"
    >
      <div className="w-full text-center p-3 h-[50px] bg-[#eb9d4d] rounded-t-md uppercase font-bold">Chi tiết hóa đơn</div>
      <div className="p-4">
      <ConfigProvider
        theme={{
          token: {
            borderRadius: 8,
          },
          components: {
            Table: {
              borderColor: "red",
              headerBg: "#2b663c !important",
              colorBgContainer: '#e2d2bd !important'
            }
          }
        }}
      >
        <Table
          dataSource={dataBillDetails}
          columns={columns}
          bordered
          scroll={{ y: 600}}
          className="not-fixed"
          pagination={false}
          rowKey={(record => record.id)}
          loading={loading}
        />
      </ConfigProvider>
      </div>
    </Modal>
  )
}

export default InvoiceDetails