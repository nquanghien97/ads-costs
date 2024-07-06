import { ConfigProvider, Table, TableColumnsType } from 'antd';
import EyeIcon from "../../../assets/icons/EyeIcon";

interface RecordType {
  tienNhan: string;
  thanhToanHoaDon: string;
  thanhToanChiPhiKhac: string;
  key: string;
}

interface BankTransactionByDateProps {
  setOpenPaymentDetails: React.Dispatch<React.SetStateAction<boolean>>
}

function BankTransactionByDate(props: BankTransactionByDateProps) {

  const { setOpenPaymentDetails } = props

  const columns: TableColumnsType<RecordType> = [
    {
      title: 'Tiền nhận',
      dataIndex: 'tienNhan',
      key: 'e',
      render: (e) => (
        <div>
          <div className="flex items-center justify-center gap-2">
            {e}
            <div onClick={() => setOpenPaymentDetails(pre => !pre)} >
              <EyeIcon width={18} height={18} className="cursor-pointer" />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'TT Hóa đơn',
      dataIndex: 'thanhToanHoaDon',
      key: 'e',
    },
    {
      title: 'TT Chi phí khác',
      dataIndex: 'thanhToanChiPhiKhac',
      key: 'e',
      render: (e) => (
        <div>
          <div className="flex items-center justify-center gap-2">
            {e}
            <div onClick={() => setOpenPaymentDetails(pre => !pre)} >
              <EyeIcon width={18} height={18} className="cursor-pointer" />
            </div>
          </div>
        </div>
      ),
    },
  ];
  
  const data: RecordType[] = [
    {
      tienNhan: "123",
      thanhToanHoaDon: "123",
      thanhToanChiPhiKhac: "123" ,
      key: "1",
    },
    {
      tienNhan: "123",
      thanhToanHoaDon: "123",
      thanhToanChiPhiKhac: "123" ,
      key: "2",
    },
    {
      tienNhan: "123",
      thanhToanHoaDon: "123",
      thanhToanChiPhiKhac: "123",
      key: "3",
    },
    {
      tienNhan: "123",
      thanhToanHoaDon: "123",
      thanhToanChiPhiKhac: "123",
      key: "4",
    },
    {
      tienNhan: "123",
      thanhToanHoaDon: "123",
      thanhToanChiPhiKhac: "123",
      key: "5",
    },
    {
      tienNhan: "123",
      thanhToanHoaDon: "123",
      thanhToanChiPhiKhac: "123",
      key: "6",
    },
  ];

  return (
    <div className="">
      <div className="px-6 py-2 my-2 rounded-full bg-[#0071BA] text-white sticky top-[12px] z-50 flex">14 / 06</div>
      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: 'red',
            borderRadius: 8,
            colorBorder: "#eb9d4d",
            // Alias Token
            colorBgContainer: '#f6ffea',
          },
          components: {
            Table: {
              borderColor: "red",
              headerBg: "#2b663c"
            }
          }
        }}
      >
        <Table columns={columns} dataSource={data} pagination={false} bordered />
      </ConfigProvider>
    </div>
  )
}

export default BankTransactionByDate;
