import { ConfigProvider, Table, TableColumnsType } from "antd";
import CloseIcon from "../../../assets/icons/CloseIcon";
import EditIcon from "../../../assets/icons/EditIcon";
import ButtonIcon from "../../../components/common/ButtonIcon";
import { useEffect, useState } from "react";
import EditBankAccount from "../EditBankAccount";
import { BankAccountType } from "../../../entities/BankAccount";
import { getListBankAccounts } from "../../../services/bank_account";

function TableBankAccount() {
  
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [data, setData] = useState<BankAccountType[]>([]);
  const [loading, setLoading] = useState(false);
  const [bankId, setBankId] = useState<number>(-1)

  const columns: TableColumnsType<BankAccountType> = [
    {
      title: 'ID',
      dataIndex: 'bank_id',
      key: '1',
    },
    {
      title: 'Hệ thống',
      dataIndex: 'system',
      key: '2',
    },
    {
      title: 'Hộ kinh doanh',
      dataIndex: 'group',
      key: '3',
    },
    {
      title: 'Mã MKT',
      dataIndex: 'username',
      key: '4',
    },
    {
      title: 'Họ tên',
      dataIndex: 'name',
      key: '5'
    },
    {
      title: 'Số TKNH',
      dataIndex: 'card_number',
      key: '6',
    },
    {
      title: 'Bank',
      dataIndex: 'bank_name',
      key: '7',
    },
    {
      title: 'Trạng thái sử dụng',
      dataIndex: 'status',
      key: '8',
    },
    {
      title: 'Thao tác',
      render(_, record) {
        return (
          <div className="flex flex-col items-center px-2">
            <div
              className="flex items-center"
              onClick={() => {
                setOpenModalEdit(true)
                setBankId(record.id)
              }}>
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

  
  useEffect(() => {
    const fetchListBankAccounts = async () => {
      setLoading(true);
      try {
        const res = await getListBankAccounts();
        setData(res.data.data.list);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchListBankAccounts();
  }, [])

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
              loading={loading}
            />
          </ConfigProvider>
      </div>
      {openModalEdit && <EditBankAccount onClose={() => setOpenModalEdit(false)} open={openModalEdit} bankId={bankId} />}
    </>
  )
}

export default TableBankAccount;
