import ButtonIcon from "../../../components/common/ButtonIcon";
import EditIcon from "../../../assets/icons/EditIcon";
import CloseIcon from "../../../assets/icons/CloseIcon";
import { ConfigProvider, Table, TableColumnsType } from "antd";
interface FieldType {
  id: string;
  role: string;
  hoTen: string;
  heThong: string;
  hoKinhDoanh: string;
  chucVu: string;
}

const columns: TableColumnsType<FieldType> = [
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
        <div className="flex flex-col px-2">
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
            rowKey={(record) => record.id}
            bordered
          />
        </ConfigProvider>
    </div>
  )
}

export default TableUser;