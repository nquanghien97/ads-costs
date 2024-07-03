import Table, { ColumnsType } from "rc-table";
import ButtonIcon from "../../../components/common/ButtonIcon";
import EditIcon from "../../../assets/icons/EditIcon";
import CloseIcon from "../../../assets/icons/CloseIcon";

interface FieldType {
  id: string;
  role: string;
  hoTen: string;
  heThong: string;
  hoKinhDoanh: string;
  chucVu: string;
}

const columns: ColumnsType<FieldType> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: '1',
  },
  {
    title: 'Vai trò',
    dataIndex: 'role',
    key: '2',
  },
  {
    title: 'Hệ thống',
    dataIndex: 'heThong',
    key: '3',
  },
  {
    title: 'Hộ kinh doanh',
    dataIndex: 'hoKinhDoanh',
    key: '4',
  },
  {
    title: 'Chức vụ',
    dataIndex: 'chucVu',
    key: '5',
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
    role: 'string',
    hoTen: 'string',
    heThong: 'string',
    hoKinhDoanh: 'string',
    chucVu: 'string'
  },
  {
    id: 'string',
    role: 'string',
    hoTen: 'string',
    heThong: 'string',
    hoKinhDoanh: 'string',
    chucVu: 'string'
  },
  {
    id: 'string',
    role: 'string',
    hoTen: 'string',
    heThong: 'string',
    hoKinhDoanh: 'string',
    chucVu: 'string'
  },
  {
    id: 'string',
    role: 'string',
    hoTen: 'string',
    heThong: 'string',
    hoKinhDoanh: 'string',
    chucVu: 'string'
  },
]

function TableUser() {
  return (
    <Table data={data} columns={columns} />
  )
}

export default TableUser;