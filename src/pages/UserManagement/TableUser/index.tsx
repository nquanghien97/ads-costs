import { Button, ConfigProvider, notification, Table, TableColumnsType } from "antd";
import User, { pagingUser } from "../../../entities/User";
import { useEffect, useState } from "react";
import { getUsers } from "../../../services/users";
import EditIcon from "../../../assets/icons/EditIcon";
import LockIcon from "../../../assets/icons/LockIcon";
import CloseIcon from "../../../assets/icons/CloseIcon";
import EditUser from "../ActionPopup/EditUser";
import UpdatePassword from "../ActionPopup/UpdatePassword";

function TableUser() {
  
  const [users, setUsers] = useState<User[]>([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [userId, setUserId] = useState(-1)
  const [pagingUsers, setPagingUsers] = useState<pagingUser>()
  const [loading, setLoading] = useState(false);
  const [openUpdatePasswordModal, setOpenUpdatePasswordModal] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  
  const columns: TableColumnsType<User> = [
    {
      title: 'ID',
      dataIndex: 'index',
      key: '1',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Mã',
      dataIndex: ['username'],
      key: '2',
    },
    {
      title: 'Họ tên',
      dataIndex: ['name'],
      key: '3',
    },
    {
      title: 'Hệ thống',
      dataIndex: ['system', 'name'],
      key: '4',
    },
    {
      title: 'Hộ kinh doanh',
      dataIndex: ['group', 'name'],
      key: '5',
    },
    {
      title: 'Chức vụ',
      dataIndex: 'role',
      key: '5',
    },
    {
      title: 'Thao tác',
      render(_, record) {
        return (
          <div className="flex flex-col gap-2 p-2">
            <div className="flex justify-between gap-2">
              <ConfigProvider
                button={{
                  className: "hover:!bg-[#538b53]"
                }}
              >
                <div
                  className="flex items-center w-full"
                  onClick={() => {
                    setUserId(record.id)
                    setOpenEditModal(true)}
                  }
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
              <div className="flex items-center w-full">
                <Button
                  icon={<LockIcon color="white" />}
                  type="primary"
                  danger
                  className="w-full"
                >      
                  <p className="text-white">Khóa</p>
                </Button>
              </div>
            </div>
            <div 
              className="flex items-center"
              onClick={() => setOpenUpdatePasswordModal(true)}
            >
              <Button
                icon={<CloseIcon color="white" />}
                type="primary"
                className="w-full"
              >      
                <p className="text-white">Cập nhật mật khẩu</p>
              </Button>
            </div>
          </div>
        )
      },
    },
  ]

  const fetchUsers = async ({ page, page_size } : { page: number, page_size: number }) => {
    const res = await getUsers({ page, page_size});
    return res
  }

  const onChange = async (page: number, pageSize: number) => {
    setLoading(true);
    try {
      const res = await fetchUsers({ page, page_size: pageSize })
      setUsers(res.data.data.list);
      setPagingUsers(res.data.data.paging)
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    (async () => {
      const res = await fetchUsers({ page: 1, page_size: 10 })
      setUsers(res.data.data.list);
      setPagingUsers(res.data.data.paging)
      setLoading(false);
    })();
  }, []);

  return (
    <>
      {contextHolder}
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
            dataSource={users}
            rowHoverable={false}
            rowKey={(record) => record.id}
            bordered
            pagination={{
              total: pagingUsers?.total,
              onChange: onChange
            }}
            loading={loading}
          />
        </ConfigProvider>
        {openEditModal && <EditUser onClose={() => setOpenEditModal(false)} userId={userId} />}
        {openUpdatePasswordModal && <UpdatePassword open={openUpdatePasswordModal} onCancel={() => setOpenUpdatePasswordModal(false)} api={api} onOk={() => console.log('ok')} />}
      </div>
    </>
  )
}

export default TableUser;