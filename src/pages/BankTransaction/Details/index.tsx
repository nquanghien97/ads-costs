import { ConfigProvider, Modal, Table, TableColumnsType } from "antd";
import { formatCurrency } from "../../../utils/currency";
import { convertToDate, formatDate } from "../../../utils/date";
import { useEffect, useState } from "react";
import { getBankBillDetails } from "../../../services/bank_transaction";

interface PaymentDetailsProps {
  onClose: () => void;
  open: boolean
  dataDetails: {
    bank_account_id: number;
    date: string
    title: string;
    type?: string
  }
}

function BillDetails(props: PaymentDetailsProps) {
  const { onClose, open, dataDetails } = props
  
  const [dataBillDetails, setDataBillDetails] = useState([]);
  const dateBill = formatDate(convertToDate(dataDetails.date));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(!dataDetails.bank_account_id || !dataDetails.date) return
    setLoading(true);
    (async () => {
      const res = await getBankBillDetails({ since: dateBill, until: dateBill, bank_account_id: dataDetails.bank_account_id, type: dataDetails.type || '' })
      setDataBillDetails(res.data.data.list)
      setLoading(false)
    })()
  }, [dateBill, dataDetails.bank_account_id, dataDetails.date, dataDetails.type]);

  const columns: TableColumnsType = [
    {
      title: 'SỐ TIỀN',
      key: '3',
      dataIndex: 'amount',
      render(value) {
        return (
          <span>{`${formatCurrency(value)} VNĐ`}</span>
        )
      },
      width: 200
    },
    {
      title: 'Hạng mục thanh toán',
      key: '4',
      dataIndex: 'type',
      width: 200
    },
  ]
  
  return (
    <Modal
      onCancel={onClose}
      open={open}
      footer={false}
      className="!w-full"
    >
      <div className="w-full text-center p-3 h-[50px] bg-[#da9851] rounded-t-md uppercase font-bold">{dataDetails.title}</div>
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
            scroll={{ y: 600 }}
            className="not-fixed"
            pagination={false}
            rowKey={(record => record.bank_account_id)}
            loading={loading}
            rowHoverable={false}
          />
        </ConfigProvider>
      </div>
    </Modal>
  )
}

export default BillDetails