import Table, { ColumnsType } from "rc-table";

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
    width: 100,
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
    title: 'Tiền thanh toán hóa đơn',
    dataIndex: 'tienThanhToanHoaDon',
    width: 100,
    key: 'e',
  },
  {
    title: 'TT Chi phí khác',
    dataIndex: 'chiPhiKhac',
    width: 100,
    key: 'e',
  },
  {
    title: 'Số dư hiện tại',
    dataIndex: 'soDuHienTai',
    width: 100,
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

function TableBankTransaction() {
  return (
    <div className="my-8">
      <div className="m-auto w-full my-4">
        <div className="px-6 py-2 rounded-full bg-[#eb9d4d] uppercase">Hệ thống 1 - HKD 1</div>
      </div>
      <Table data={data} columns={columns} />
    </div>
  )
}

export default TableBankTransaction;
