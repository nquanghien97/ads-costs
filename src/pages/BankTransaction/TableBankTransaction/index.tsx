import Table, { ColumnsType } from "rc-table";
import BankTransactionByDate from "./BankTransactionByDate";

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

const columns: ColumnsType<RecordType> = [
  {
    title: 'Mã TKNH',
    dataIndex: 'maTKNH',
    minWidth: 100,
    key: '1',

  },
  {
    title: 'Họ tên',
    dataIndex: 'hoTen',
    minWidth: 100,
    key: '2',
  },
  {
    title: 'STK Ngân hàng',
    dataIndex: 'stkNganHang',
    minWidth: 100,
    key: '3',
  },
  {
    title: 'Bank',
    dataIndex: 'bank',
    minWidth: 100,
    key: '4',
  },
  {
    title: 'Tiền nhận',
    dataIndex: 'tienNhan',
    minWidth: 50,
    key: 'e',
  },
  {
    title: 'Tiền TT hóa đơn',
    dataIndex: 'tienThanhToanHoaDon',
    minWidth: 100,
    key: 'e',
  },
  {
    title: 'TT Chi phí khác',
    dataIndex: 'chiPhiKhac',
    minWidth: 100,
    key: 'e',
  },
  {
    title: 'Số dư hiện tại',
    dataIndex: 'soDuHienTai',
    minWidth: 100,
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
}

function TableBankTransaction(props: TableBankTransactionProps) {

  const { setOpenPaymentDetails } = props

  return (
    <div className="my-8">
      <div className="m-auto w-full my-4">
        <div className="px-6 py-2 rounded-full bg-[#eb9d4d] uppercase">Hệ thống 1 - HKD 1</div>
      </div>
      <div className="flex gap-2">
        <div className="flex-[0_0_60%]">
          <div className="px-6 py-2 my-2 rounded-full h-10 text-white top-0 z-50 flex"></div>
          <Table data={data} columns={columns} />
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
