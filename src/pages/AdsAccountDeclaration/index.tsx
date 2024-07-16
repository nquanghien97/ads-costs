import Header from "./Header";
import EditIcon from "../../assets/icons/EditIcon";
import CloseIcon from "../../assets/icons/CloseIcon";
import ButtonIcon from "../../components/common/ButtonIcon";
import { ConfigProvider, Table, TableColumnsType } from "antd";
import withAuth from "../../hocs/withAuth";

interface FieldType {
  createdAt: string;
  heThong: string;
  hoKinhDoanh: string;
  maMKT: string;
  hoTen: string;
  maTKQC: string;
  kenhChay: string;
  idTKQC: string;
  tenTKQC: string;
  loaiTKQC: string;
  tienTe: string;
  muiGio: string;
  tyGia: string;
  phiThue: string;
  bankLienKetTKQC: string;
  trangThaiTKQC: string;
}

const columns: TableColumnsType<FieldType> = [
  {
    title: 'Thời gian',
    dataIndex: 'createdAt',
    key: '1',
  },
  {
    title: 'Hệ thống',
    dataIndex: 'heThong',
    key: '2',
  },
  {
    title: 'Hộ kinh doanh',
    dataIndex: 'hoKinhDoanh',
    key: '3',
  },
  {
    title: 'Mã MKT',
    dataIndex: 'maMKT',
    key: '4',
  },
  {
    title: 'Họ tên',
    dataIndex: 'hoTen',
    key: '5'
  },
  {
    title: 'Mã TKQC',
    dataIndex: 'maTKQC',
    key: '6',
  },
  {
    title: 'ID TKQC',
    dataIndex: 'idTKQC',
    key: '7',
  },
  {
    title: 'Tên TKQC',
    dataIndex: 'tenTKQC',
    key: '8',
  },
  {
    title: 'Loại TKQC',
    dataIndex: 'loaiTKQC',
    key: '9',
  },
  {
    title: 'Tiền tệ',
    dataIndex: 'tienTe',
    key: '10',
  },
  {
    title: 'Múi giờ',
    dataIndex: 'muiGio',
    key: '11',
  },
  {
    title: 'Tỷ giá TKQC thuê',
    dataIndex: 'tyGia',
    key: '12',
  },
  {
    title: 'Phí thuê',
    dataIndex: 'phiThue',
    key: '13',
  },
  {
    title: 'Bank liên kết TKQC',
    dataIndex: 'bankLienKetTKQC',
    key: '14',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'trangThaiTKQC',
    key: '15',
  },
  {
    title: 'Thao tác',
    render() {
      return (
        <div className="flex flex-col items-center px-2">
          <div className="flex items-center">
            <ButtonIcon>
              <EditIcon width={16} height={16} color="green" />
            </ButtonIcon>
            <p>Sửa</p>
          </div>
          <div className="flex items-center">
            <ButtonIcon>
              <CloseIcon color="red" />
            </ButtonIcon>
            <p>Xóa</p>
          </div>
        </div>
      )
    },
  },
]

const data = [
  {
    createdAt: 'string',
    heThong: 'string',
    hoKinhDoanh: 'string',
    maMKT: 'string',
    hoTen: 'string',
    maTKQC: 'string',
    kenhChay: 'string',
    idTKQC: '1',
    tenTKQC: 'string',
    loaiTKQC: 'string',
    tienTe: 'string',
    muiGio: 'string',
    tyGia: 'string',
    phiThue: 'string',
    bankLienKetTKQC: 'string',
    trangThaiTKQC: 'string',
  },
  {
    createdAt: 'string',
    heThong: 'string',
    hoKinhDoanh: 'string',
    maMKT: 'string',
    hoTen: 'string',
    maTKQC: 'string',
    kenhChay: 'string',
    idTKQC: '2',
    tenTKQC: 'string',
    loaiTKQC: 'string',
    tienTe: 'string',
    muiGio: 'string',
    tyGia: 'string',
    phiThue: 'string',
    bankLienKetTKQC: 'string',
    trangThaiTKQC: 'string',
  },
  {
    createdAt: 'string',
    heThong: 'string',
    hoKinhDoanh: 'string',
    maMKT: 'string',
    hoTen: 'string',
    maTKQC: 'string',
    kenhChay: 'string',
    idTKQC: '3',
    tenTKQC: 'string',
    loaiTKQC: 'string',
    tienTe: 'string',
    muiGio: 'string',
    tyGia: 'string',
    phiThue: 'string',
    bankLienKetTKQC: 'string',
    trangThaiTKQC: 'string',
  }
]

function AdsAccountDeclaration() {
  return (
    <div className="px-4">
      <Header />
      <div className="custom-header-table">
        <ConfigProvider
          theme={{
            token: {
              borderRadius: 8,
            },
            components: {
              Table: {
                borderColor: "red",
                headerBg: "#d19b5c !important",
                colorBgContainer: '#e2d2bd !important'
              }
            }
          }}
        >
          <Table
            columns={columns}
            dataSource={data}
            rowHoverable={false}
            pagination={false}
            rowKey={(record) => record.idTKQC}
            bordered
          />
        </ConfigProvider>
      </div>
    </div>
  )
}

const AdsAccountDeclarationWithAuth = withAuth(AdsAccountDeclaration)
export default AdsAccountDeclarationWithAuth;