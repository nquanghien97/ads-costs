import Header from "./Header";
import EditIcon from "../../assets/icons/EditIcon";
import CloseIcon from "../../assets/icons/CloseIcon";
import { Button, ConfigProvider, Table, TableColumnsType } from "antd";
import withAuth from "../../hocs/withAuth";
import { AdsAccountType, pagingAdAccount } from "../../entities/AdsAccount";
import { useEffect, useState } from "react";
import { getListAdsAccount } from "../../services/ads_account";
import EditAdsAccount from "./EditAdsAccount";
import BaseButton from "../../components/common/BaseButton";
import PlusIcon from "../../assets/icons/PlusIcon";
import AddNewAdsAccount from "./AddNewAdsAccount";
import DeleteAdAccount from "./DeleteAdAccount";

function AdsAccountDeclaration() {

  const [data, setData] = useState<AdsAccountType[]>([]);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [refreshKey, setRefreshKey] = useState(false);
  const [adAccountId, setAdAccountId] = useState(-1);
  const [openAddNewAdsAccount, setOpenAddNewAdsAccount] = useState(false);
  const [openDeleteAdAccount, setOpenDeleteAdAccount] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pagingAdAccount, setPagingAdAccount] = useState<pagingAdAccount>()

  const columns: TableColumnsType<AdsAccountType> = [
    {
      title: 'Thời gian',
      dataIndex: 'created_at',
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
      dataIndex: ['user', 'name'],
      key: '5'
    },
    {
      title: 'Mã TKQC',
      render: (_, record) => {
        return (
          <div>{`TK${record.id}`}</div>
        )
      },
      key: '6',
    },
    {
      title: 'ID TKQC',
      dataIndex: 'account_id',
      key: '7',
    },
    {
      title: 'Tên TKQC',
      dataIndex: 'account_name',
      key: '8',
    },
    {
      title: 'Kênh chạy',
      dataIndex: 'channel',
      key: '9',
    },
    {
      title: 'Loại TKQC',
      dataIndex: 'type',
      key: '10',
    },
    {
      title: 'Tiền tệ',
      dataIndex: 'currency',
      key: '111',
      width: 70
    },
    {
      title: 'Múi giờ',
      dataIndex: 'timezone',
      key: '12',
    },
    {
      title: 'Tỷ giá TKQC thuê',
      dataIndex: 'exchange_rate',
      key: '13',
    },
    {
      title: 'Phí thuê',
      dataIndex: 'rental_fee',
      key: '14',
    },
    {
      title: 'Bank liên kết TKQC',
      dataIndex: ['bank_account', 'bank_name'],
      key: '15',
    },
    {
      title: 'Trạng thái',
      dataIndex: ['status'],
      key: '16',
    },
    {
      title: 'Thao tác',
      width: 100,
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
                  setAdAccountId(record.id)
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

  const fetchListAdAccount = async ({ page, page_size }: { page: number, page_size: number }) => {
    const res = await getListAdsAccount({ page, page_size })
    return res.data.data
  }

  const onChange = async (page: number, pageSize: number) => {
    setLoading(true);
    try {
      const dataAdAccount = await fetchListAdAccount({ page, page_size: pageSize })
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
      const res = await fetchListAdAccount({ page: 1, page_size: 10 });
      setLoading(false);
      setData(res.list)
    })()
  }, [refreshKey])

  return (
    <div className="px-4">
      <Header />
      <div className="flex justify-between mb-4">
        <div className="m-auto">
          <span className="px-6 py-2 rounded-full bg-[#0071BA] text-white uppercase">Khai báo tài khoản quảng cáo</span>
        </div>
        <BaseButton color="info" className="text-white" onClick={() => setOpenAddNewAdsAccount(true)}>
          Thêm mới
          <PlusIcon color="white" />
        </BaseButton>
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
            bordered
            pagination={{
              total: pagingAdAccount?.total,
              pageSize: 10,
              onChange: onChange
            }}
            loading={loading}
            scroll={{ y: 450 }}
          />
        </ConfigProvider>
      </div>
      <AddNewAdsAccount onClose={() => setOpenAddNewAdsAccount(false)} setRefreshKey={setRefreshKey} open={openAddNewAdsAccount} />
      <EditAdsAccount adAccountId={adAccountId} onClose={() => setOpenModalEdit(false)} open={openModalEdit} setRefreshKey={setRefreshKey} />
      <DeleteAdAccount openDeleteModal={openDeleteAdAccount} onClose={() => setOpenDeleteAdAccount(false)} setRefreshKey={setRefreshKey} account_id={adAccountId} />
    </div>
  )
}

const AdsAccountDeclarationWithAuth = withAuth(AdsAccountDeclaration)
export default AdsAccountDeclarationWithAuth;