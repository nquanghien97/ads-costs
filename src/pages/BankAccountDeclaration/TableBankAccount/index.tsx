import { Button, ConfigProvider, Table, TableColumnsType } from "antd";
import CloseIcon from "../../../assets/icons/CloseIcon";
import EditIcon from "../../../assets/icons/EditIcon";
import { useEffect, useState } from "react";
import EditBankAccount from "../EditBankAccount";
import { BankAccountType, pagingBankAccount } from "../../../entities/BankAccount";
import { getListBankAccounts } from "../../../services/bank_account";
import BaseButton from "../../../components/common/BaseButton";
import PlusIcon from "../../../assets/icons/PlusIcon";
import AddNewBankAccount from "../AddNewBankAccount";
import DeleteBankAccount from "../DeleteBankAccount";

interface TableBankAccountProps {
  data: BankAccountType[]
  setData: React.Dispatch<React.SetStateAction<BankAccountType[]>>
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

function TableBankAccount(props: TableBankAccountProps) {
  const { data, setData, loading, setLoading } = props
  
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [bankId, setBankId] = useState<number>(-1);
  const [refreshKey, setRefreshKey] = useState(false);
  const [openAddNewBankAccount, setOpenAddNewBankAccount] = useState(false);
  const [openDeleteBankAccount, setOpenDeleteBankAccount] = useState(false);
  const [pagingBankAccount, setPagingBankAccount] = useState<pagingBankAccount>()

  const columns: TableColumnsType<BankAccountType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: '1',
    },
    {
      title: 'Hệ thống',
      dataIndex: ['system', 'name'],
      key: '2',
    },
    {
      title: 'Hộ kinh doanh',
      dataIndex: ['group', 'name'],
      key: '3',
    },
    {
      title: 'Mã MKT',
      dataIndex: ['user', 'username'],
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
          <div className="flex flex-col justify-between gap-2">
            <ConfigProvider
              button={{
                className: "hover:!bg-[#538b53]"
              }}
            >
              <div
                className="flex items-center w-full"
                onClick={() => {
                  setOpenModalEdit(true)
                  setBankId(record.id)
                }}
              >
                <Button
                  className="bg-[green] w-full"
                  type="primary"
                  icon={<EditIcon width={16} height={16} color="white" />}
                >
                  <p className="text-white">Sửa</p>
                </Button>
              </div>
            </ConfigProvider>
            <div
              className="flex items-center w-full"
              onClick={() => {
                setOpenDeleteBankAccount(true);
                setBankId(record.id)
              }}
            >
              <Button
                icon={<CloseIcon width={16} height={16} color="white" />}
                type="primary"
                danger
                className="w-full"
              >
                <p className="text-white">Xóa</p>
              </Button>
            </div>
          </div>
        )
      },
    },
  ]

  const fetchListBankAccounts = async ({ page, page_size } : { page: number, page_size: number}) => {
    const res = await getListBankAccounts({page, page_size})
    return res.data.data
  }

  const onChange = async (page: number, pageSize: number) => {
    setLoading(true);
    try {
      const dataAdAccount = await fetchListBankAccounts({ page, page_size: pageSize })
      setData(dataAdAccount.list);
      setPagingBankAccount(dataAdAccount.paging)
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetchListBankAccounts({ page: 1, page_size: 10 });
        setData(res.list);
        setPagingBankAccount(res.paging)
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })()
  }, [refreshKey])

  return (
    <>
      <div className="flex justify-between my-4">
        <div className="m-auto">
          <span className="px-6 py-2 rounded-full bg-[#0071BA] text-white uppercase">Khai báo tài khoản ngân hàng</span>
        </div>
        <BaseButton color="info" className="text-white" onClick={() => setOpenAddNewBankAccount(true)}>
          Thêm mới
          <PlusIcon color="white" />
        </BaseButton>
      </div>
      {openAddNewBankAccount && <AddNewBankAccount onClose={() => setOpenAddNewBankAccount(false)} setRefreshKey={setRefreshKey} />}
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
              pagination={{
                total: pagingBankAccount?.total,
                pageSize: 10,
                onChange: onChange
              }}
              rowKey={(record) => record.id}
              scroll={{ y: 450 }}
              bordered
              loading={loading}
            />
          </ConfigProvider>
      </div>
      {openModalEdit && <EditBankAccount onClose={() => setOpenModalEdit(false)} open={openModalEdit} bankId={bankId} setRefreshKey={setRefreshKey} />}
      {openDeleteBankAccount && <DeleteBankAccount openDeleteModal={openDeleteBankAccount} bankId={bankId} onClose={() => setOpenDeleteBankAccount(false)} setRefreshKey={setRefreshKey} />}
    </>
  )
}

export default TableBankAccount;
