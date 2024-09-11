import Header from "./Header";
import EditIcon from "../../assets/icons/EditIcon";
import CloseIcon from "../../assets/icons/CloseIcon";
import { Button, ConfigProvider, Table, TableColumnsType } from "antd";
import withAuth from "../../hocs/withAuth";
import { AdsAccountType, pagingAdAccount } from "../../entities/AdsAccount";
import { useCallback, useEffect, useState } from "react";
import EditAdsAccount from "./EditCampaign";
import PlusIcon from "../../assets/icons/PlusIcon";
import AddNewAdsAccount from "./AddNewCampaign";
import DeleteAdAccount from "./DeleteCampaign";
import { AdsAccountStatusType } from "../../entities/AdsAccountStatus";
import { ExportExcelAdsAccount } from "../../components/ExportExcel/ExportExcelAdsAccount";
import { formatCurrency } from "../../utils/currency";
import { useAuthStore } from "../../zustand/auth.store";
import { UserRole } from "../../entities/User";
import { formatDate } from "../../utils/date";
import ArrowLeft from "../../assets/icons/ArrowLeft";
import ArrowRight from "../../assets/icons/ArrowRight";
import { getCampaigns } from "../../services/campaigns";
import { CampaignsDTO } from "../../dto/Campaigns";

export interface SubmitFormSearchType {
  search?: string;
  system_id?: number;
  group_id?: number;
  name?: string;
  channel_id?: number;
  since?: string;
  until?: string;
  page?: number;
  page_size?: number;
}

function CampaignsDeclaration() {

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
  const [expandColumns, setOnExpandColumns] = useState(false);
  const [dataCampaign, setDataCampaign] = useState<{ id: number, campaign_id: string, account_id: string }>()

  const { user } = useAuthStore();

  const columns: TableColumnsType<AdsAccountType> = [
    {
      title: 'Thời gian',
      dataIndex: 'created_at',
      width: 200,
      key: '1',
      render: (record: Date) => {
        return (
          <div>{formatDate((new Date(record)))}</div>
        )
      }
    },
    {
      title: 'Hệ thống',
      dataIndex: ['ad_account', 'system', 'name'],
      key: '2',
      width: 150
    },
    {
      title: 'Hộ kinh doanh',
      dataIndex: ['ad_account', 'group', 'name'],
      key: '3',
      width: 200
    },
    {
      title: 'Mã MKT',
      dataIndex: ['ad_account', 'user', 'username'],
      key: '4',
      width: 100
    },
    {
      title: 'Họ tên',
      dataIndex: ['ad_account', 'user', 'name'],
      key: '5',
      width: 200
    },
    {
      title: 'Mã chiến dịch',
      render: (record: AdsAccountType) => {
        return (
          <div>{`CD${record.id}`}</div>
        )
      },
      key: '6',
      width: 100
    },
    {
      title: 'ID chiến dịch',
      dataIndex: 'campaign_id',
      key: '7',
      width: 250
    },
    {
      title: 'ID TKQC',
      dataIndex: 'account_id',
      key: '7',
      width: 250
    },
    {
      title: 'Tên TKQC',
      dataIndex: ['ad_account', 'account_name'],
      key: '8',
      width: 300
    },
    {
      title: 'Kênh chạy',
      dataIndex: ['ad_account', 'channel'],
      key: '9',
      width: 100
    },
    {
      title: 'Loại TKQC',
      dataIndex: ['ad_account', 'type'],
      key: '10',
      width: 200
    },
    {
      title: (<div className="flex"><p className="mr-2">Tiền tệ</p><div className="cursor-pointer flex justify-center items-center" onClick={() => setOnExpandColumns(pre => !pre)}>{expandColumns ? <ArrowLeft color="#e9e9e9" width={32} height={32} /> : <ArrowRight width={32} height={32} color="#e9e9e9" />}</div></div>),
      dataIndex: ['ad_account', 'currency'],
      key: '11',
      width: 100
    },
    {
      title: 'Múi giờ',
      dataIndex: ['ad_account', 'timezone'],
      key: '12',
      width: 100
    },
    {
      title: 'Tỷ giá TKQC thuê',
      dataIndex: ['ad_account', 'exchange_rate'],
      key: '13',
      width: 100,
      render(value: number) {
        return (
          formatCurrency(value, 0)
        )
      }
    },
    {
      title: 'Phí thuê',
      dataIndex: ['ad_account', 'rental_fee'],
      key: '14',
      width: 100,
      render(value: number) {
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
          key: '151',
          width: 150,
          dataIndex: ['ad_account', 'bank_account', 'bank_name']
        },
        {
          title: 'Số TKNH',
          key: '152',
          width: 150,
          dataIndex: ['ad_account', 'bank_account', 'card_number']
        }
      ]
    },
    {
      title: 'Trạng thái chiến dịch',
      dataIndex: ['ad_account', 'status'],
      key: '16',
      width: 200,
      render(value: string) {
        if (AdsAccountStatusType.DANG_SU_DUNG === value) {
          return (
            <div className="flex justify-center">
              <span className="bg-[#68c2ed] py-1 px-2 text-center rounded-md text-black w-full">{value}</span>
            </div>
          )
        } else if (AdsAccountStatusType.NGUNG_SU_DUNG === value) {
          return (
            <div className="flex justify-center">
              <span className="bg-[red] py-2 px-2 text-center rounded-md text-white w-full">{value}</span>
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
      title: 'BM QUẢN LÝ',
      key: '17',
      children: [
        {
          title: 'ID BM',
          dataIndex: ['ad_account', 'bm_id'],
          key: '171',
          width: 200
        },
        {
          title: 'Tên BM',
          dataIndex: ['ad_account', 'bm_name'],
          key: '172',
          width: 200
        },
        {
          title: 'SỞ HỮU',
          dataIndex: ['ad_account', 'bm_owned_by'],
          key: '173',
          width: 100
        }
      ]
    },
    user.role !== UserRole.ACCOUNTANT && {
      title: 'Thao tác',
      width: 250,
      render(record: CampaignsDTO) {
        return (
          <div className="flex justify-between gap-2 py-2">
            <ConfigProvider
              button={{
                className: "hover:!bg-[#3ca348]"
              }}
            >
              <div
                className="flex items-center w-full"
                onClick={() => {
                  setOpenModalEdit(true)
                  setAdAccountId(record.id)
                  setBankAccountId(record.ad_account.bank_account?.bank_id)
                  setDataCampaign({
                    id: record.id,
                    account_id: record.account_id,
                    campaign_id: record.campaign_id
                  })
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
        );
      },
    } || null,
  ].filter(column => column !== null)

  const fetchListAdAccount = useCallback(async ({ page, page_size }: { page: number, page_size: number }) => {
    const res = await getCampaigns({ page, page_size, ...submitFormSearch })
    return res.data.data
  }, [submitFormSearch])

  const onChange = async (page: number, pageSize: number) => {
    setLoading(true);
    setSubmitFormSearch({ ...submitFormSearch, page, page_size: pageSize })
    try {
      const dataCampaigns = await fetchListAdAccount({ page, page_size: pageSize, ...submitFormSearch })
      setData(dataCampaigns.list);
      setPagingAdAccount(dataCampaigns.paging)
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
  }, [fetchListAdAccount, refreshKey, submitFormSearch]);

  const hiddenKeys = ['12', '13', '14', '15', '17']
  const hiddenColumns = columns.filter(staticColumn => !hiddenKeys.includes(staticColumn.key as string));
  const newColumns = expandColumns ? columns : hiddenColumns

  return (
    <div className="px-4">
      <Header setLoading={setLoading} setSubmitFormSearch={setSubmitFormSearch} />
      <div className="flex justify-between mb-4">
        <div className="m-auto">
          <span className="px-6 py-2 rounded-full bg-[#68c2ed] font-bold text-black uppercase">Khai báo ID chiến dịch</span>
        </div>
        <div className="flex gap-2">
          <Button size="large" className="border-[1px] border-[#007bb5] rounded-lg">
            <ExportExcelAdsAccount apiData={data} />
          </Button>
          <div className="bg-[#68c2ed] border-[1px] border-[#007bb5] rounded-lg cursor-pointer h-full px-4 flex items-center justify-center hover:opacity-80 duration-300 text-black" onClick={() => setOpenAddNewAdsAccount(true)}>
            Thêm mới
            <PlusIcon color="black" />
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
                borderColor: "#007bb5",
                headerBg: "#f3ec90 !important",
                colorBgContainer: '#e2d2bd !important',
                headerColor: "black",
              }
            }
          }}
        >
          <Table
            columns={newColumns}
            dataSource={data}
            rowHoverable={false}
            rowKey={(record) => record.id}
            rowClassName={(_, index) => index % 2 === 0 ? 'bg-[#e9e9e9]' : 'bg-white'}
            bordered
            pagination={{
              total: pagingAdAccount?.total,
              pageSize: pagingAdAccount?.page_size,
              onChange: onChange,
              showTotal: (total) => <span className="font-bold">{`Tổng:   ${total}`}</span>,
              showSizeChanger: true,
              pageSizeOptions: [10, 20, 50, 100, pagingAdAccount?.total].filter(item => item !== undefined).sort((a, b) => a - b)
            }}
            loading={loading}
            scroll={{ y: 600, x: newColumns.length * 100 }}
          />
        </ConfigProvider>
      </div>
      <EditAdsAccount
        adAccountId={adAccountId}
        onClose={() => setOpenModalEdit(false)}
        open={openModalEdit}
        setRefreshKey={setRefreshKey}
        bankAccountId={bankAccountId}
        dataCampaign={dataCampaign}
      />
      <AddNewAdsAccount
        onClose={() => setOpenAddNewAdsAccount(false)}
        setRefreshKey={setRefreshKey}
        open={openAddNewAdsAccount}
      />
      <DeleteAdAccount openDeleteModal={openDeleteAdAccount} onClose={() => setOpenDeleteAdAccount(false)} setRefreshKey={setRefreshKey} account_id={adAccountId} />
    </div>
  )
}

const CampaignsDeclarationWithAuth = withAuth(CampaignsDeclaration)
export default CampaignsDeclarationWithAuth;