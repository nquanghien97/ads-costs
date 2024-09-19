import Header from "./Header";
import EditIcon from "../../assets/icons/EditIcon";
import CloseIcon from "../../assets/icons/CloseIcon";
import { Button, ConfigProvider, Table, TableColumnsType } from "antd";
import withAuth from "../../hocs/withAuth";
import { AdsAccountType, pagingAdAccount } from "../../entities/AdsAccount";
import { useEffect, useState } from "react";
import { getListAdsAccount } from "../../services/ads_account";
import EditAdsAccount from "./EditAdsAccountLive";
import PlusIcon from "../../assets/icons/PlusIcon";
import AddNewAdsAccountLive from "./AddNewAdsAccountLive";
import DeleteAdAccount from "./DeleteAdsAccountLive";
import { ExportExcelAdsAccount } from "../../components/ExportExcel/ExportExcelAdsAccount";
import { useAuthStore } from "../../zustand/auth.store";
import { UserRole } from "../../entities/User";
import { formatDate } from "../../utils/date";

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

function AdsAccountLiveDeclaration() {

  const [data, setData] = useState<AdsAccountType[]>([]);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [refreshKey, setRefreshKey] = useState(false);
  const [adAccountId, setAdAccountId] = useState(0);
  const [bankAccountId, setBankAccountId] = useState(0);
  const [openAddNewAdsAccount, setOpenAddNewAdsAccount] = useState(false);
  const [openDeleteAdAccount, setOpenDeleteAdAccount] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pagingAdAccount, setPagingAdAccount] = useState<pagingAdAccount>();
  const [submitFormSearch, setSubmitFormSearch] = useState<SubmitFormSearchType>({
    search: '',
    system_id: 0,
    group_id: 0,
    name: '',
    channel_id: 0,
    since: '',
    until: '',
    page: 0,
    page_size: 0,
  });

  const { user } = useAuthStore();

  const columns: TableColumnsType<AdsAccountType> = [
    {
      title: 'Thời gian live',
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
      dataIndex: ['system', 'name'],
      key: '2',
      width: 150
    },
    {
      title: 'Hộ kinh doanh',
      dataIndex: ['group', 'name'],
      key: '3',
      width: 200
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
      render: (record: AdsAccountType) => {
        return (
          <div>{`TK${record.id}`}</div>
        )
      },
      key: '6',
      width: 100,
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
      title: 'ID Chiến dịch',
      dataIndex: 'account_id',
      key: '8',
      width: 300
    },
    {
      title: "11/09",
      key: '11',
      width: 300,
      children: [
        {
          title: "Thành viên tham gia",
          key: '11.1',
          render() {
            return (
              <div className="flex flex-col gap-2 my-2">
                <p className="p-1 border-[1px] border-[black] rounded-md">Nguyen Van A</p>
                <p className="p-1 border-[1px] border-[black] rounded-md">Nguyen Van B</p>
              </div>
            )
          },
          width: 200
        },
        {
          title: "CPQC",
          key: '11.2',
          render() {
            return "10.000.000đ"
          },
          width: 200
        },
      ],
    }, {
      title: "18/09",
      key: '12',
      width: 300,
      children: [
        {
          title: "Thành viên tham gia",
          key: '12.1',
          render() {
            return (
              <div className="flex flex-col gap-2 my-2">
                <p className="p-1 border-[1px] border-[black] rounded-md">Nguyen Van A</p>
                <p className="p-1 border-[1px] border-[black] rounded-md">Nguyen Van B</p>
              </div>
            )
          },
          width: 200
        },
        {
          title: "CPQC",
          key: '12.2',
          render() {
            return "10.000.000đ"
          },
          width: 200
        },
      ],
    },
    user.role !== UserRole.ACCOUNTANT && {
      title: 'Thao tác',
      width: 150,
      render(record: AdsAccountType) {
        return (
          <div className="flex flex-col justify-between gap-2 py-2">
            <ConfigProvider
              button={{
                className: "hover:!bg-[#5a5acc]"
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
        );
      },
    } || null,
  ].filter(column => column !== null)

  const onChange = async (page: number, pageSize: number) => {
    setLoading(true);
    setSubmitFormSearch({ ...submitFormSearch, page, page_size: pageSize })
  }

  useEffect(() => {
    document.title = "Khai báo tài khoản quảng cáo"
  }, []);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const res = await getListAdsAccount({
        ...submitFormSearch,
      });
      setLoading(false);
      setData(res.data.data.list);
      setPagingAdAccount(res.data.data.paging)
    })()
  }, [refreshKey, submitFormSearch])
  return (
    <div className="px-4">
      <Header setLoading={setLoading} setSubmitFormSearch={setSubmitFormSearch} />
      <div className="flex justify-between mb-4">
        <div className="flex">
          <div className="bg-[#68c2ed] border-[1px] border-[#007bb5] rounded-lg cursor-pointer h-full px-4 flex items-center justify-center hover:opacity-80 duration-300 text-black" onClick={() => setOpenAddNewAdsAccount(true)}>
            Khai báo phiên live
            <PlusIcon color="black" />
          </div>
        </div>
        <div className="m-auto">
          <div className="mr-[160px]">
            <span className="px-6 py-2 rounded-full bg-[#68c2ed] font-bold text-black uppercase">Khai báo tài khoản quảng cáo livestream</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="large" className="border-[1px] border-[#007bb5] rounded-lg">
            <ExportExcelAdsAccount apiData={data} />
          </Button>
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
            columns={columns}
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
            scroll={{ y: 560, x: columns.length * 100 }}
          />
        </ConfigProvider>
      </div>
      <AddNewAdsAccountLive
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

const AdsAccountLiveDeclarationWithAuth = withAuth(AdsAccountLiveDeclaration)
export default AdsAccountLiveDeclarationWithAuth;