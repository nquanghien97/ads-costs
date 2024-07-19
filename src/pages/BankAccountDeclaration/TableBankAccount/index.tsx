import { ConfigProvider, Table, TableColumnsType } from "antd";
import CloseIcon from "../../../assets/icons/CloseIcon";
import EditIcon from "../../../assets/icons/EditIcon";
import ButtonIcon from "../../../components/common/ButtonIcon";
import { useState } from "react";
import EditBankAccount from "../EditBankAccount";

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

  const [openModalEdit, setOpenModalEdit] = useState(false);

  const columns: TableColumnsType<FieldType> = [
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
            <div className="flex items-center" onClick={() => setOpenModalEdit(true)}>
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

  return (
    <>
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
              scroll={{ y: 450 }}
              bordered
            />
          </ConfigProvider>
      </div>
      {openModalEdit && <EditBankAccount onClose={() => setOpenModalEdit(false)} open={openModalEdit} />}
    </>
  )
}

export default TableBankAccount;
