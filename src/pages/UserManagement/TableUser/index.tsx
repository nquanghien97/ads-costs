import { Button, ConfigProvider, Table, TableColumnsType } from "antd";
import User, { pagingUser } from "../../../entities/User";
import { useEffect, useState } from "react";
import { getUsers } from "../../../services/users";
import EditIcon from "../../../assets/icons/EditIcon";
import LockIcon from "../../../assets/icons/LockIcon";
import EditUser from "../action/EditUser";
import UpdatePassword from "../action/UpdatePassword";
import AddNewUser from "../action/AddNewUser";
import PlusIcon from "../../../assets/icons/PlusIcon";
import { SearchFormType } from "..";
import { roleOptions } from "../../../config/userRoleOption";
import { UnlockOutlined } from "@ant-design/icons";
import BlockUser from "../action/BlockUser";
import UnBlockUser from "../action/UnBlockUser";
import UpdatePasswordIcon from "../../../assets/icons/UpdatePasswordIcon";

interface TableUserProps {
  users: User[],
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  searchForm: SearchFormType | undefined
  setSearchForm: React.Dispatch<React.SetStateAction<SearchFormType>>
}

function TableUser(props: TableUserProps) {

  const { users, setUsers, loading, setLoading, searchForm, setSearchForm } = props;

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openBlockModal, setOpenBlockModal] = useState(false);
  const [openUnBlockModal, setOpenUnBlockModal] = useState(false);
  const [user, setUser] = useState({
    userId: -1,
    userName: ''
  })
  const [pagingUsers, setPagingUsers] = useState<pagingUser>()
  const [openUpdatePasswordModal, setOpenUpdatePasswordModal] = useState(false);
  const [openAddNewAdsAccount, setOpenAddNewAdsAccount] = useState(false);
  const [refreshKey, setRefreshKey] = useState(false);
  const [dataBlock, setDataBlock] = useState({
    user_id: -1,
    username: ''
  });

  const columns: TableColumnsType<User> = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: '1',
      width: 40,
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Mã',
      dataIndex: ['username'],
      width: 80,
      key: '2',
    },
    {
      title: 'Họ tên',
      width: 160,
      dataIndex: ['name'],
      key: '3',
    },
    {
      title: 'Hệ thống',
      dataIndex: ['system', 'name'],
      key: '4',
      width: 150
    },
    {
      width: 100,
      title: 'Hộ kinh doanh',
      dataIndex: ['group', 'name'],
      key: '5',
    },
    {
      title: 'Chức vụ',
      width: 120,
      dataIndex: 'role',
      key: '5',
      render(value) {
        return (
          <span>{roleOptions.find(role => role.value === value)?.label}</span>
        )
      }
    },
    {
      title: 'Thao tác',
      width: 220,
      render(_, record) {
        return (
          <div className="flex flex-col gap-2 px-2">
            <div className="flex justify-between gap-2">
              <ConfigProvider
                button={{
                  // className: "hover:!bg-[#538b53]"
                }}
              >
                <div
                  className="flex items-center"
                  onClick={() => {
                    setUser({
                      userId: record.id,
                      userName: record.username
                    })
                    setOpenEditModal(true)
                  }
                  }
                >
                  <Button
                    className="w-full"
                    type="primary"
                    icon={<EditIcon width={16} height={16} color="black" />}
                  >
                    <p className="text-black">Sửa</p>
                  </Button>
                </div>
              </ConfigProvider>
              <div className="flex items-center min-w-[120px]">
                {record.is_blocked ? (
                  <>
                    <ConfigProvider
                      button={{
                        className: "hover:!bg-[#538b53]"
                      }}
                    >
                      <Button
                        icon={<UnlockOutlined className="text-black" />}
                        type="primary"
                        className="w-full bg-[green]"
                        onClick={() => {
                          setOpenUnBlockModal(true)
                          setDataBlock({
                            user_id: record.id,
                            username: record.username
                          })
                        }}
                      >
                        <p className="text-black">Mở Khóa</p>
                      </Button>
                    </ConfigProvider>
                  </>
                ) : (
                  <>
                    <Button
                      icon={<LockIcon color="black" />}
                      type="primary"
                      danger
                      className="w-full"
                      onClick={() => {
                        setOpenBlockModal(true)
                        setDataBlock({
                          user_id: record.id,
                          username: record.username
                        })
                      }}
                    >
                      <p className="text-black">Khóa</p>
                    </Button>
                  </>
                )}
              </div>
              <div
                className="flex items-center"
                onClick={() => {
                  setOpenUpdatePasswordModal(true)
                  setUser({
                    userId: record.id,
                    userName: record.username
                  })
                }}
              >
                <ConfigProvider
                  button={{
                    className: "hover:!bg-[#edad37]"
                  }}
                >

                  <Button
                    icon={<UpdatePasswordIcon color="black" />}
                    type="primary"
                    className="w-full bg-[#FFA500]"
                  >
                    <p className="text-black">Cập nhật mật khẩu</p>
                  </Button>
                </ConfigProvider>
              </div>
            </div>
          </div>
        )
      },
    },
  ]

  const onChange = async (page: number, pageSize: number) => {
    setLoading(true);
    setSearchForm({ ...searchForm, page, page_size: pageSize });
  }

  useEffect(() => {
    setLoading(true);
    (async () => {
      const res = await getUsers({...searchForm})
      setUsers(res.data.data.list);
      setPagingUsers(res.data.data.paging)
      setLoading(false);
    })();
  }, [refreshKey, searchForm, setLoading, setUsers]);

  return (
    <>
      <div className="flex mb-4">
        <div className="m-auto">
          <span className="px-6 p-2 rounded-full bg-[#68c2ed] text-black uppercase">Quản lý người dùng</span>
        </div>
        <div
          className="bg-[#68c2ed] border-[1px] py-2 border-[#007bb5] rounded-lg cursor-pointer h-full px-4 flex items-center justify-center hover:opacity-80 duration-300 text-black"
          onClick={() => setOpenAddNewAdsAccount(true)}
        >
          Thêm mới
          <PlusIcon color="black" />
        </div>
      </div>
      {openAddNewAdsAccount && <AddNewUser onClose={() => setOpenAddNewAdsAccount(false)} setRefreshKey={setRefreshKey} />}
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
            dataSource={users}
            rowHoverable={false}
            rowKey={(record) => record.id}
            rowClassName={(_, index) => index % 2 === 0 ? 'bg-[#e9e9e9]' : 'bg-white'}
            bordered
            pagination={{
              total: pagingUsers?.total,
              pageSize: pagingUsers?.page_size,
              onChange: onChange,
              showTotal: (total) => <span className="font-bold">{`Tổng:   ${total}`}</span>,
              showSizeChanger: true
            }}
            loading={loading}
            scroll={{ y: 600 }}
          />
        </ConfigProvider>
        {openEditModal && <EditUser onClose={() => setOpenEditModal(false)} user={user} setRefreshKey={setRefreshKey} open={openEditModal} />}
        {openUpdatePasswordModal && <UpdatePassword open={openUpdatePasswordModal} user_id={user.userId} onCancel={() => setOpenUpdatePasswordModal(false)} onOk={() => console.log('ok')} />}
        <BlockUser open={openBlockModal} onCancel={() => setOpenBlockModal(false)} dataBlock={dataBlock} setRefreshKey={setRefreshKey} />
        <UnBlockUser open={openUnBlockModal} onCancel={() => setOpenUnBlockModal(false)} dataUnBlock={dataBlock} setRefreshKey={setRefreshKey} />
      </div>
    </>
  )
}

export default TableUser;