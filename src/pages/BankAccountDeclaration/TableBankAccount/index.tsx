import Table, { ColumnsType } from "rc-table";
import CloseIcon from "../../../assets/icons/CloseIcon";
import EditIcon from "../../../assets/icons/EditIcon";
import ButtonIcon from "../../../components/common/ButtonIcon";

interface FieldType {
  id: string;
  heThong: string;
  hoKinhDoanh: string;
  maMKT: string;
  hoTen: string;
  maTKQC: string;
  soTKNH: string;
  bank: string;
  trangThaiSuDung: string;
}

const columns: ColumnsType<FieldType> = [
  {
    title: 'ID',
    dataIndex: 'id',
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
    title: 'Số TKNH',
    dataIndex: 'soTKNH',
    key: '6',
  },
  {
    title: 'Bank',
    dataIndex: 'bank',
    key: '7',
  },
  {
    title: 'Trạng thái sử dụng',
    dataIndex: 'trangThaiSuDung',
    key: '8',
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
    id: 'string',
    heThong: 'string',
    hoKinhDoanh: 'string',
    maMKT: 'string',
    hoTen: 'string',
    maTKQC: 'string',
    soTKNH: 'string',
    bank: 'string',
    trangThaiSuDung: 'string'
  },
  {
    id: 'string',
    heThong: 'string',
    hoKinhDoanh: 'string',
    maMKT: 'string',
    hoTen: 'string',
    maTKQC: 'string',
    soTKNH: 'string',
    bank: 'string',
    trangThaiSuDung: 'string'
  },
  {
    id: 'string',
    heThong: 'string',
    hoKinhDoanh: 'string',
    maMKT: 'string',
    hoTen: 'string',
    maTKQC: 'string',
    soTKNH: 'string',
    bank: 'string',
    trangThaiSuDung: 'string'
  },
]

function TableBankAccount() {
  return (
    <div className="custom-header-table">
      <Table columns={columns} data={data} />
    </div>
  )
}

export default TableBankAccount;
