import Header from "./Header";
import EditIcon from "../../assets/icons/EditIcon";
import CloseIcon from "../../assets/icons/CloseIcon";
import ButtonIcon from "../../components/common/ButtonIcon";
import { ConfigProvider, Table, TableColumnsType } from "antd";
import withAuth from "../../hocs/withAuth";
import { AdsAccountType } from "../../entities/AdsAccount";
import { useEffect, useState } from "react";
import { GetListAdsAccount } from "../../services/ads_account";
import EditAdsAccount from "./EditAdsAccount";

const data: AdsAccountType[] = [
  {
    id: 1,
    user_id: 101,
    account_id: "ACC12345",
    account_name: "Ad Account 1",
    channel_id: 1,
    type_id: 2,
    status_id: 1,
    currency_id: 1,
    exchange_rate: 1.0,
    timezone_id: 3,
    rental_fee: 100,
    bank_account_id: 1,
    channel: "Google Ads",
    type: "Standard",
    status: "Active",
    currency: "USD",
    timezone: "UTC-5",
    bank_account: {
      id: 1,
      user_id: 101,
      bank_id: 1,
      name: "John Doe",
      card_number: "1234567890123456",
      status: "Verified",
      bank_name: "Bank A"
    }
  },
  {
    id: 2,
    user_id: 102,
    account_id: "ACC67890",
    account_name: "Ad Account 2",
    channel_id: 2,
    type_id: 3,
    status_id: 2,
    currency_id: 2,
    exchange_rate: 0.85,
    timezone_id: 4,
    rental_fee: 150,
    bank_account_id: 2,
    channel: "Facebook Ads",
    type: "Premium",
    status: "Inactive",
    currency: "EUR",
    timezone: "UTC+1",
    bank_account: {
      id: 2,
      user_id: 102,
      bank_id: 2,
      name: "Jane Smith",
      card_number: "2345678901234567",
      status: "Verified",
      bank_name: "Bank B"
    }
  },
  {
    id: 3,
    user_id: 103,
    account_id: "ACC54321",
    account_name: "Ad Account 3",
    channel_id: 3,
    type_id: 1,
    status_id: 3,
    currency_id: 3,
    exchange_rate: 0.75,
    timezone_id: 5,
    rental_fee: 200,
    bank_account_id: 3,
    channel: "Twitter Ads",
    type: "Basic",
    status: "Pending",
    currency: "GBP",
    timezone: "UTC+0",
    bank_account: {
      id: 3,
      user_id: 103,
      bank_id: 3,
      name: "Alice Johnson",
      card_number: "3456789012345678",
      status: "Pending",
      bank_name: "Bank C"
    }
  },
  {
    id: 4,
    user_id: 104,
    account_id: "ACC98765",
    account_name: "Ad Account 4",
    channel_id: 4,
    type_id: 4,
    status_id: 4,
    currency_id: 4,
    exchange_rate: 1.2,
    timezone_id: 6,
    rental_fee: 250,
    bank_account_id: 4,
    channel: "LinkedIn Ads",
    type: "Enterprise",
    status: "Suspended",
    currency: "JPY",
    timezone: "UTC+9",
    bank_account: {
      id: 4,
      user_id: 104,
      bank_id: 4,
      name: "Bob Brown",
      card_number: "4567890123456789",
      status: "Suspended",
      bank_name: "Bank D"
    }
  }
]

function AdsAccountDeclaration() {

  // const [data, setData] = useState<AdsAccountType[]>([]);
  const [openModalEdit, setOpenModalEdit] = useState(false);

  const columns: TableColumnsType<AdsAccountType> = [
    {
      title: 'Thời gian',
      dataIndex: 'createdAt',
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
      dataIndex: 'user_id',
      key: '4',
    },
    {
      title: 'Họ tên',
      dataIndex: 'account_name',
      key: '5'
    },
    {
      title: 'Mã TKQC',
      dataIndex: 'account_id',
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
      title: 'Loại TKQC',
      dataIndex: 'type',
      key: '9',
    },
    {
      title: 'Tiền tệ',
      dataIndex: 'currency',
      key: '10',
    },
    {
      title: 'Múi giờ',
      dataIndex: 'timezone',
      key: '11',
    },
    {
      title: 'Tỷ giá TKQC thuê',
      dataIndex: 'exchange_rate',
      key: '12',
    },
    {
      title: 'Phí thuê',
      dataIndex: 'rental_fee',
      key: '13',
    },
    {
      title: 'Bank liên kết TKQC',
      dataIndex: ['bank_account', 'name'],
      key: '14',
    },
    {
      title: 'Trạng thái',
      dataIndex: ['bank_account', 'status'],
      key: '15',
    },
    {
      title: 'Thao tác',
      render() {
        return (
          <div className="flex flex-col items-center px-2">
            <div className="flex items-center"  onClick={() => setOpenModalEdit(true)}>
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

  // useEffect(() => {
  //   (async() => {
  //     const res = await GetListAdsAccount();
  //     console.log(res.data.data.list)
  //   })()
  // })
  return (
    <div className="px-4">
      <Header />
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
      {openModalEdit && <EditAdsAccount onClose={() => setOpenModalEdit(false)} open={openModalEdit} />}
    </div>
  )
}

const AdsAccountDeclarationWithAuth = withAuth(AdsAccountDeclaration)
export default AdsAccountDeclarationWithAuth;