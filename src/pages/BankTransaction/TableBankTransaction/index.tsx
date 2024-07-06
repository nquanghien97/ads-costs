import { ConfigProvider, Table, TableColumnsType } from 'antd';
import BankTransactionByDate from "./BankTransactionByDate";
import { BankBillingsDTO } from "../../../dto/BankBillingsDTO";

interface RecordType {
  maTKNH: string;
  hoTen: string;
  stkNganHang: string;
  bank: string;
  tienNhan: string;
  tienThanhToanHoaDon: string;
  chiPhiKhac: string;
  soDuHienTai: string;
  key: string,
}

const columns: TableColumnsType<RecordType> = [
  {
    title: 'Mã TKNH',
    dataIndex: 'maTKNH',
    key: '1',

  },
  {
    title: 'Họ tên',
    dataIndex: 'hoTen',
    key: '2',
  },
  {
    title: 'STK Ngân hàng',
    dataIndex: 'stkNganHang',
    key: '3',
  },
  {
    title: 'Bank',
    dataIndex: 'bank',
    key: '4',
  },
  {
    title: 'Tiền nhận',
    dataIndex: 'tienNhan',
    key: 'e',
  },
  {
    title: 'Tiền TT hóa đơn',
    dataIndex: 'tienThanhToanHoaDon',
    key: 'e',
  },
  {
    title: 'TT Chi phí khác',
    dataIndex: 'chiPhiKhac',
    key: 'e',
  },
  {
    title: 'Số dư hiện tại',
    dataIndex: 'soDuHienTai',
    key: 'e',
  },
];

const data: RecordType[] = [
  {
    maTKNH: "13812340987",
    hoTen: "FB",
    stkNganHang: "12345",
    bank: "VND",
    tienNhan: "+7",
    tienThanhToanHoaDon: "trả trước",
    chiPhiKhac: "TCB",
    soDuHienTai: "Đang sử dụng",
    key: "1",
  },
  {
    maTKNH: "13812340987",
    hoTen: "FB",
    stkNganHang: "12345",
    bank: "VND",
    tienNhan: "+7",
    tienThanhToanHoaDon: "trả trước",
    chiPhiKhac: "TCB",
    soDuHienTai: "Đang sử dụng",
    key: "2",
  },
  {
    maTKNH: "13812340987",
    hoTen: "FB",
    stkNganHang: "12345",
    bank: "VND",
    tienNhan: "+7",
    tienThanhToanHoaDon: "trả trước",
    chiPhiKhac: "TCB",
    soDuHienTai: "Đang sử dụng",
    key: "3",
  },
  {
    maTKNH: "13812340987",
    hoTen: "FB",
    stkNganHang: "12345",
    bank: "VND",
    tienNhan: "+7",
    tienThanhToanHoaDon: "trả trước",
    chiPhiKhac: "TCB",
    soDuHienTai: "Đang sử dụng",
    key: "4",
  },
  {
    maTKNH: "13812340987",
    hoTen: "FB",
    stkNganHang: "12345",
    bank: "VND",
    tienNhan: "+7",
    tienThanhToanHoaDon: "trả trước",
    chiPhiKhac: "TCB",
    soDuHienTai: "Đang sử dụng",
    key: "5",
  },
  {
    maTKNH: "13812340987",
    hoTen: "FB",
    stkNganHang: "12345",
    bank: "VND",
    tienNhan: "+7",
    tienThanhToanHoaDon: "trả trước",
    chiPhiKhac: "TCB",
    soDuHienTai: "Đang sử dụng",
    key: "6",
  },
];

interface TableBankTransactionProps {
  setOpenPaymentDetails: React.Dispatch<React.SetStateAction<boolean>>
  datas: BankBillingsDTO
}

function TableBankTransaction(props: TableBankTransactionProps) {

  const { setOpenPaymentDetails, datas } = props
  console.log(datas);

  return (
    <div className="my-8" key={datas.system_id}>
      <div className="m-auto w-full my-4">
        <div className="px-6 py-2 rounded-full bg-[#eb9d4d] uppercase w-[60%]">{datas.system.name}</div>
      </div>
      <div className="flex gap-2">
        <div className="flex-[0_0_60%] w-full">
          <div className="px-6 py-2 my-2 rounded-full h-10 text-white top-0 z-50 flex"></div>
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
        <div className="relative overflow-x-auto custom-header-table-bydate">
          <div className="flex gap-2 flex-[0_0_40%]">
            <BankTransactionByDate setOpenPaymentDetails={setOpenPaymentDetails} />
            <BankTransactionByDate setOpenPaymentDetails={setOpenPaymentDetails} />
            <BankTransactionByDate setOpenPaymentDetails={setOpenPaymentDetails} />
            <BankTransactionByDate setOpenPaymentDetails={setOpenPaymentDetails} />
            <BankTransactionByDate setOpenPaymentDetails={setOpenPaymentDetails} />
          </div>
        </div>

      </div>
    </div>
  )
}

export default TableBankTransaction;
