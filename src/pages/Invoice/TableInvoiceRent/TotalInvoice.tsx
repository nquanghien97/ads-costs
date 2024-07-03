import type { ColumnsType } from 'rc-table';
import Table from 'rc-table';

interface RecordType {
  maTKQC: string;
  kenhChay: string;
  idTKQC: string;
  tienTe: string;
  muiGio: string;
  phiThue: string;
  tyGiaTKQCThue: string;
  trangThaiTKQC: string;
  soLieu: {
    TKQC: string;
    VND: string;
  };
  tongCPQC: {
    TKQC: string;
    VND: string;
  };
  tongHoaDon: {
    TKQC: string;
    VND: string;
  };
  key: string,
}

const columns: ColumnsType<RecordType> = [
  {
    title: 'Mã TKQC',
    dataIndex: 'maTKQC',
    minWidth: 100,
    key: '1',

  },
  {
    title: 'Kênh chạy',
    dataIndex: 'kenhChay',
    width: 100,
    key: '2',
  },
  {
    title: 'ID TKQC',
    dataIndex: 'idTKQC',
    minWidth: 100,
    key: '3',
  },
  {
    title: 'Tiền tệ',
    dataIndex: 'tienTe',
    minWidth: 100,
    key: '4',
  },
  {
    title: 'Múi giờ',
    dataIndex: 'muiGio',
    minWidth: 50,
    key: 'e',
  },
  {
    title: 'Phí thuê',
    dataIndex: 'phiThue',
    width: 100,
    key: 'e',
  },
  {
    title: 'Tỷ giá TKQC thuê',
    dataIndex: 'tyGiaTKQCThue',
    width: 100,
    key: 'e',
  },
  {
    title: 'Số liệu',
    dataIndex: 'soLieu',
    width: 200,
    key: 'e',
    render: (e) => (
      <div>
        <div className="row-custom">{e.TKQC}</div>
        <div className="row-custom">{e.VND}</div>
      </div>
    ),
  },
  {
    title: 'Tổng CPQC',
    dataIndex: 'tongCPQC',
    width: 200,
    key: 'e',
    render: (e) => (
      <div>
        <div className="row-custom">{e.TKQC}</div>
        <div className="row-custom">{e.VND}</div>
      </div>
    ),
  },
  {
    title: 'Tổng hóa đơn',
    dataIndex: 'tongHoaDon',
    width: 200,
    key: 'e',
    render: (e) => (
      <div>
        <div className="row-custom">{e.TKQC}</div>
        <div className="row-custom">{e.VND}</div>
      </div>
    ),
  },
];

const data: RecordType[] = [
  {
    maTKQC: "13812340987",
    kenhChay: "FB",
    idTKQC: "12345",
    tienTe: "VND",
    muiGio: "+7",
    phiThue: "trả trước",
    tyGiaTKQCThue: "TCB",
    trangThaiTKQC: "Đang sử dụng",
    soLieu: {
      TKQC: "TKQC",
      VND: "VND",
    },
    tongCPQC: {
      TKQC: "25$",
      VND: "625.000đ",
    },
    tongHoaDon: {
      TKQC: "25$",
      VND: "625.000đ",
    },
    key: "1",
  },
  {
    maTKQC: "13812340987",
    kenhChay: "FB",
    idTKQC: "12345",
    tienTe: "VND",
    muiGio: "+7",
    phiThue: "trả trước",
    tyGiaTKQCThue: "TCB",
    trangThaiTKQC: "Đang sử dụng",
    soLieu: {
      TKQC: "TKQC",
      VND: "VND",
    },
    tongCPQC: {
      TKQC: "25$",
      VND: "625.000đ",
    },
    tongHoaDon: {
      TKQC: "25$",
      VND: "625.000đ",
    },
    key: "2",
  },
  {
    maTKQC: "13812340987",
    kenhChay: "FB",
    idTKQC: "12345",
    tienTe: "VND",
    muiGio: "+7",
    phiThue: "trả trước",
    tyGiaTKQCThue: "TCB",
    trangThaiTKQC: "Đang sử dụng",
    soLieu: {
      TKQC: "TKQC",
      VND: "VND",
    },
    tongCPQC: {
      TKQC: "25$",
      VND: "625.000đ",
    },
    tongHoaDon: {
      TKQC: "25$",
      VND: "625.000đ",
    },
    key: "3",
  },
  {
    maTKQC: "13812340987",
    kenhChay: "FB",
    idTKQC: "12345",
    tienTe: "VND",
    muiGio: "+7",
    phiThue: "trả trước",
    tyGiaTKQCThue: "TCB",
    trangThaiTKQC: "Đang sử dụng",
    soLieu: {
      TKQC: "TKQC",
      VND: "VND",
    },
    tongCPQC: {
      TKQC: "25$",
      VND: "625.000đ",
    },
    tongHoaDon: {
      TKQC: "25$",
      VND: "625.000đ",
    },
    key: "4",
  },
  {
    maTKQC: "13812340987",
    kenhChay: "FB",
    idTKQC: "12345",
    tienTe: "VND",
    muiGio: "+7",
    phiThue: "trả trước",
    tyGiaTKQCThue: "TCB",
    trangThaiTKQC: "Đang sử dụng",
    soLieu: {
      TKQC: "TKQC",
      VND: "VND",
    },
    tongCPQC: {
      TKQC: "25$",
      VND: "625.000đ",
    },
    tongHoaDon: {
      TKQC: "25$",
      VND: "625.000đ",
    },
    key: "5",
  },
];

const TotalInvoice = () => (
  <div className="relative">
    <div className="px-6 py-2 my-2 rounded-full h-10 text-white top-0 z-50 flex"></div>
    <Table columns={columns} data={data} />
  </div>
);

export default TotalInvoice;