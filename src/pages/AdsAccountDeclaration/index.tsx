import Header from "./Header";
import EditIcon from "../../assets/icons/EditIcon";
import CloseIcon from "../../assets/icons/CloseIcon";
import { Button, ConfigProvider, Table, TableColumnsType } from "antd";
import withAuth from "../../hocs/withAuth";
import { AdsAccountType, pagingAdAccount } from "../../entities/AdsAccount";
import { useCallback, useEffect, useState } from "react";
import { getListAdsAccount } from "../../services/ads_account";
import EditAdsAccount from "./EditAdsAccount";
import PlusIcon from "../../assets/icons/PlusIcon";
import AddNewAdsAccount from "./AddNewAdsAccount";
import DeleteAdAccount from "./DeleteAdAccount";
import { AdsAccountStatusType } from "../../entities/AdsAccountStatus";
import { ExportToExcel } from "../../components/ExportExcel";

export interface SubmitFormSearchType {
  search: string;
  system_id?: number;
  group_id?: number;
  name?: string;
  channel_id?: number;
  since?: string;
  until?: string;
  page?: number;
  page_size?: number;
}

function AdsAccountDeclaration() {

  const [data, setData] = useState<AdsAccountType[]>([]);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [refreshKey, setRefreshKey] = useState(false);
  const [adAccountId, setAdAccountId] = useState(0);
  const [bankAccountId, setBankAccountId] = useState(0);
  const [openAddNewAdsAccount, setOpenAddNewAdsAccount] = useState(false);
  const [openDeleteAdAccount, setOpenDeleteAdAccount] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pagingAdAccount, setPagingAdAccount] = useState<pagingAdAccount>();
  const [submitFormSearch, setSubmitFormSearch] = useState<SubmitFormSearchType>();

  const columns: TableColumnsType<AdsAccountType> = [
    {
      title: 'Thời gian',
      dataIndex: 'created_at',
      width: 200,
      key: '1',
      render: (_, record) => {
        return (
          <div>{(new Date(record.created_at)).toLocaleString()}</div>
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
      dataIndex: ['user', 'name'],
      key: '5',
      width: 200
    },
    {
      title: 'Mã TKQC',
      render: (_, record) => {
        return (
          <div>{`TK${record.id}`}</div>
        )
      },
      key: '6',
      width: 100
    },
    {
      title: 'ID TKQC',
      dataIndex: 'account_id',
      key: '7',
      width: 250
    },
    {
      title: 'Tên TKQC',
      dataIndex: 'account_name',
      key: '8',
      width: 300
    },
    {
      title: 'Kênh chạy',
      dataIndex: 'channel',
      key: '9',
      width: 100
    },
    {
      title: 'Loại TKQC',
      dataIndex: 'type',
      key: '10',
      width: 200
    },
    {
      title: 'Tiền tệ',
      dataIndex: 'currency',
      key: '111',
      width: 80
    },
    {
      title: 'Múi giờ',
      dataIndex: 'timezone',
      key: '12',
      width: 100
    },
    {
      title: 'Tỷ giá TKQC thuê',
      dataIndex: 'exchange_rate',
      key: '13',
      width: 100
    },
    {
      title: 'Phí thuê',
      dataIndex: 'rental_fee',
      key: '14',
      width: 100,
      render(value) {
        return (
          <div>{`${value} %`}</div>
        )
      }
    },
    {
      title: 'Bank liên kết TKQC',
      key: '15',
      width: 200,
      children: [
        {
          title: 'Tên ngân hàng',
          key: '111',
          width: 150,
          dataIndex: ['bank_account', 'bank_name']
        },
        {
          title: 'Số TKNH',
          key: '112',
          width: 150,
          dataIndex: ['bank_account', 'card_number']
        }
      ]
    },
    {
      title: 'Trạng thái',
      dataIndex: ['status'],
      key: '16',
      width: 200,
      render(value) {
        if (AdsAccountStatusType.DANG_SU_DUNG === value) {
          return (
            <div className="flex justify-center">
              <span className="bg-[#0071ba] py-1 px-2 text-center rounded-md text-white w-full">{value}</span>
            </div>
          )
        } else if (AdsAccountStatusType.NGUNG_SU_DUNG === value) {
          return (
            <div className="flex justify-center">
              <span className="bg-[#d37dbe] py-2 px-2 text-center rounded-md text-white w-full">{value}</span>
            </div>
          )
        } else if (AdsAccountStatusType.DIE === value) {
          return (
            <div className="flex justify-center">
              <span className="bg-[#ff4d4f] py-2 px-2 text-center rounded-md text-white w-full">{value}</span>
            </div>
          )
        }
      }
    },
    {
      title: 'Thao tác',
      width: 250,
      render(_, record) {
        return (
          <div className="flex justify-between gap-2 py-2">
            <ConfigProvider
              button={{
                className: "hover:!bg-[#538b53]"
              }}
            >
              <div
                className="flex items-center w-full"
                onClick={() => {
                  setOpenModalEdit(true)
                  setAdAccountId(record.id)
                  setBankAccountId(record.bank_account?.bank_id)
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
                setOpenDeleteAdAccount(true)
                setAdAccountId(record.id)
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

  const fetchListAdAccount = useCallback(async ({ page, page_size }: { page: number, page_size: number }) => {
    const res = await getListAdsAccount({ page, page_size, ...submitFormSearch })
    return res.data.data
  }, [submitFormSearch])

  const onChange = async (page: number, pageSize: number) => {
    setLoading(true);
    try {
      const dataAdAccount = await fetchListAdAccount({ page, page_size: pageSize, ...submitFormSearch })
      setData(dataAdAccount.list);
      setPagingAdAccount(dataAdAccount.paging)
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    document.title = "Khai báo tài khoản quảng cáo"
  }, []);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const res = await fetchListAdAccount({
        ...submitFormSearch,
        page: 1,
        page_size: 20
      });
      setLoading(false);
      setData(res.list);
      setPagingAdAccount(res.paging)
    })()
  }, [fetchListAdAccount, refreshKey, submitFormSearch])

  return (
    <div className="px-4">
      <Header setLoading={setLoading} setSubmitFormSearch={setSubmitFormSearch} />
      <div className="flex justify-between mb-4">
        <div className="m-auto">
          <span className="px-6 py-2 rounded-full bg-[#0071BA] text-white uppercase">Khai báo tài khoản quảng cáo</span>
        </div>
        <div className="flex gap-2">
          <Button size="large">
            <ExportToExcel apiData={data} fileName="Danh sách tài khoản quảng cáo" />
          </Button>
          <div className="bg-[#0071ba] rounded-md cursor-pointer h-full px-4 flex items-center justify-center hover:opacity-80 duration-300 text-white" onClick={() => setOpenAddNewAdsAccount(true)}>
            Thêm mới
            <PlusIcon color="white" />
          </div>
        </div>
      </div>
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
            rowKey={(record) => record.id}
            rowClassName={(_, index) => index % 2 === 0 ? 'table-row-custom-color' : ''}
            bordered
            pagination={{
              total: pagingAdAccount?.total,
              pageSize: pagingAdAccount?.page_size,
              onChange: onChange,
              showTotal: (total) => <span className="font-bold">{`Tổng:   ${total}`}</span>,
              showSizeChanger: true
            }}
            loading={loading}
            scroll={{ y: 600, x: 3000 }}
          />
        </ConfigProvider>
      </div>
      <AddNewAdsAccount
        onClose={() => setOpenAddNewAdsAccount(false)}
        setRefreshKey={setRefreshKey}
        open={openAddNewAdsAccount}
      />
      <EditAdsAccount
        adAccountId={adAccountId}
        onClose={() => setOpenModalEdit(false)}
        open={openModalEdit}
        setRefreshKey={setRefreshKey}
        bankAccountId={bankAccountId}
      />
      <DeleteAdAccount openDeleteModal={openDeleteAdAccount} onClose={() => setOpenDeleteAdAccount(false)} setRefreshKey={setRefreshKey} account_id={adAccountId} />
    </div>
  )
}

const AdsAccountDeclarationWithAuth = withAuth(AdsAccountDeclaration)
export default AdsAccountDeclarationWithAuth;