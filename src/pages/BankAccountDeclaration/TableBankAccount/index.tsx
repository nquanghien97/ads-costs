import { Button, ConfigProvider, Table, TableColumnsType } from "antd";
import CloseIcon from "../../../assets/icons/CloseIcon";
import EditIcon from "../../../assets/icons/EditIcon";
import { useCallback, useEffect, useState } from "react";
import EditBankAccount from "../EditBankAccount";
import { BankAccountStatusType, BankAccountType, pagingBankAccount } from "../../../entities/BankAccount";
import { getListBankAccounts } from "../../../services/bank_account";
import PlusIcon from "../../../assets/icons/PlusIcon";
import AddNewBankAccount from "../AddNewBankAccount";
import DeleteBankAccount from "../DeleteBankAccount";
import { FormSearchValueType } from "..";
import { ExportExcelBankAccount } from "../../../components/ExportExcel/ExportExcelBankAccount";

interface TableBankAccountProps {
  data: BankAccountType[]
  setData: React.Dispatch<React.SetStateAction<BankAccountType[]>>
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  formSearchValue: FormSearchValueType | undefined
  setFormSearchValue: React.Dispatch<React.SetStateAction<FormSearchValueType | undefined>>
}

function TableBankAccount(props: TableBankAccountProps) {
  const { data, setData, loading, setLoading, formSearchValue, setFormSearchValue } = props
  
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
      width: 100,
      key: '1',
      render: (value) => {
        return (
          <div>{`TKNH${value}`}</div>
        )
      }
    },
    {
      title: 'Hệ thống',
      dataIndex: ['system', 'name'],
      key: '2',
      width: 150
    },
    {
      title: 'Hộ kinh doanh',
      dataIndex: ['group', 'name'],
      key: '3',
      width: 150
    },
    {
      title: 'Mã MKT',
      dataIndex: ['user', 'username'],
      key: '4',
      width: 100
    },
    {
      title: 'Họ tên',
      dataIndex: 'name',
      key: '5',
      width: 150
    },
    {
      title: 'Số TKNH',
      dataIndex: 'card_number',
      key: '6',
      width: 220
    },
    {
      title: 'Ngân hàng',
      dataIndex: 'bank_name',
      key: '7',
      width: 150
    },
    {
      title: 'Trạng thái sử dụng',
      dataIndex: 'status',
      key: '8',
      width: 170,
      render(value) {
        if (BankAccountStatusType.Dang_su_dung === value) {
          return (
            <div className="flex justify-center">
              <span className="bg-[#0071ba] py-1 px-2 text-center rounded-md text-white w-full">{value}</span>
            </div>
          )
        } else if (BankAccountStatusType.Ngung_su_dung === value) {
          return (
            <div className="flex justify-center">
              <span className="bg-[#d37dbe] py-2 px-2 text-center rounded-md text-white w-full">{value}</span>
            </div>
          )
        }
      }
    },
    {
      title: 'Thao tác',
      width: 180,
      render(_, record) {
        return (
          <div className="flex justify-between gap-2 py-2">
            <ConfigProvider
              button={{
                className: "hover:!bg-[#538b53]"
              }}
            >
              <div
                className="flex items-center"
                onClick={() => {
                  setOpenModalEdit(true)
                  setBankId(record.id)
                }}
              >
                <Button
                  className="bg-[green]"
                  type="primary"
                  icon={<EditIcon width={16} height={16} color="white" />}
                >
                  <p className="text-white">Sửa</p>
                </Button>
              </div>
            </ConfigProvider>
            <div
              className="flex items-center"
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

  const fetchListBankAccounts = useCallback(async ({ page, page_size } : { page: number, page_size: number}) => {
    const res = await getListBankAccounts({page, page_size, ...formSearchValue})
    return res.data.data
  }, [formSearchValue])

  const onChange = async (page: number, pageSize: number) => {
    setLoading(true);
    setFormSearchValue({ ...formSearchValue, page: page, page_size: pageSize })
    try {
      const dataAdAccount = await fetchListBankAccounts({ page, page_size: pageSize, ...formSearchValue })
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
        const res = await fetchListBankAccounts({ page: 1, page_size: 20 });
        setData(res.list);
        setPagingBankAccount(res.paging)
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })()
  }, [fetchListBankAccounts, refreshKey, setData, setLoading])

  return (
    <>
      <div className="flex justify-between mb-4">
        <div className="m-auto">
          <span className="px-6 py-2 rounded-full bg-[#68c2ed] uppercase">Khai báo tài khoản ngân hàng</span>
        </div>
        <div className="flex gap-2">
          <Button size="large" rootClassName="border-[1px] border-[#007bb5] rounded-lg">
            <ExportExcelBankAccount apiData={data} />
          </Button>
          <div className="bg-[#68c2ed] cursor-pointer h-full px-4 flex items-center justify-center hover:opacity-80 duration-300 border-[1px] border-[#007bb5] rounded-lg" onClick={() => setOpenAddNewBankAccount(true)}>
            Thêm mới
            <PlusIcon />
          </div>
        </div>
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
                  borderColor: "black",
                  headerBg: "#f3ec90",
                  colorBgContainer: '#e2d2bd !important'
                }
              }
            }}
          >
            <Table
              columns={columns}
              dataSource={data}
              rowHoverable={false}
              rowClassName={(_, index) => index % 2 === 0 ? 'bg-[#e9e9e9]' : 'bg-white'}
              pagination={{
                total: pagingBankAccount?.total,
                pageSize: pagingBankAccount?.page_size,
                onChange: onChange,
                showTotal: (total) => <span className="font-bold">{`Tổng:   ${total}`}</span>,
                showSizeChanger: true,
                pageSizeOptions: [10, 20, 50, 100, pagingBankAccount?.total].filter(item => item !== undefined).sort((a, b) => a - b)
              }}
              rowKey={(record) => record.id}
              scroll={{ y: 600 }}
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
