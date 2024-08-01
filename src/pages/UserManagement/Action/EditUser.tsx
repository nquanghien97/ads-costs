import { Alert, Button, Form, Input, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { getUser, UpdateUser } from "../../../services/users";
import { useGroupsStore } from "../../../zustand/groups.store";
import { useSystemsStore } from "../../../zustand/systems.store";
import { roleOptions } from "../../../config/userRoleOption";
import axios from "axios";
import { useNotification } from "../../../hooks/useNotification";

interface EditUserProps {
  onClose: () => void;
  user: {
    userId: number;
    userName: string;
  };
  setRefreshKey: React.Dispatch<React.SetStateAction<boolean>>
  open: boolean;
}

interface FormValues {
  group: {
    label: string,
    value: number,
  },
  system: {
    label: string,
    value: number,
  },
  name: string,
  password: string,
  password_confirm: string,
  role: string,
}

function EditUser(props: EditUserProps) {
  const { onClose, user, setRefreshKey, open } = props;
  const [selectedSystem, setSelectedSystem] = useState(-1);
  const [loading, setLoading] = useState(false);
  
  const { groups } = useGroupsStore();
  const { systems } = useSystemsStore();

  const notification = useNotification()

  const handleSystemChange = (option: { label: string, value: number}) => {
    setSelectedSystem(option.value)
    form.setFieldsValue({ group: null });
  }
  const [form] = Form.useForm();

  useEffect(() => {
    (async() => {
      const res = await getUser(user.userId);
      const userData = res.data.data
      form.setFieldsValue({
        username: userData.username,
        name: userData.name,
        role: userData.role,
        system: userData.system?.name,
        group: userData.group?.name,
      });
    })()
  }, [user, form])

  const onFinish = async (data: FormValues) => {
    setLoading(true);
    try {
      const submitData = {
        group_id: data.group.value,
        system_id: data.system.value,
        password: data.password,
        password_confirm: data.password_confirm,
        role: data.role,
        name: data.name
      }
      await UpdateUser(submitData, user.userId);
      setRefreshKey(pre => !pre);
      onClose();
      notification.success('Chỉnh sửa người dùng thành công')
    } catch (err) {
      if (axios.isAxiosError(err)) {
        notification.error('Chỉnh sửa người dùng thất bại')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      open={open}
      className='!p-0 !w-4/6'
      onCancel={onClose}
      footer={false}
    >
      <div>
        <div className="w-full text-center p-3 h-[50px] bg-[#0071BA] rounded-t-md uppercase font-bold">Chỉnh sửa thông tin người dùng</div>
      </div>
      <div className="p-4 my-4">
        <Form
          form={form}
          onFinish={onFinish}
          className="flex flex-col gap-6"
        >
          <div className="flex items-center h-[40px]">
            <p className="w-[120px] text-left text-[#0071BA]">Mã MKT</p>
            <Alert message={user?.userName === undefined
              ? 'Loading...'
              :  user?.userName} className="w-full" />
          </div>
          <div className="flex items-center h-[40px]">
            <p className="w-[120px] text-left text-[#0071BA]">Họ tên</p>
            <Form.Item
              className="!mb-0 w-full"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Trường này là bắt buộc"
                }
              ]}
            >
              <Input className="py-2" />
            </Form.Item>
          </div>
          <div className="flex items-center h-[40px]">
            <p className="w-[120px] text-left text-[#0071BA]">Mật khẩu</p>
            <Form.Item
              className="!mb-0 w-full"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Trường này là bắt buộc"
                }
              ]}
            >
              <Input.Password className="py-2" />
            </Form.Item>
          </div>
          <div className="flex items-center h-[40px]">
            <p className="w-[120px] text-left text-[#0071BA]">Xác nhận mật khẩu</p>
            <Form.Item
              className="!mb-0 w-full"
              name="password_confirm"
              rules={[
                {
                  required: true,
                  message: "Trường này là bắt buộc"
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Mật khẩu xác nhận không chính xác'));
                  },
                }),
              ]}
            >
              <Input.Password className="py-2" />
            </Form.Item>
          </div>
          <div className="flex items-center h-[40px]">
            <p className="w-[120px] text-left text-[#0071BA]">Chức vụ</p>
            <Form.Item
              className="!mb-0 w-full"
              name="role"
              rules={[
                {
                  required: true,
                  message: "Trường này là bắt buộc"
                }
              ]}
            >
              <Select
                options={roleOptions}
                className="w-full h-full"
                allowClear
              />
            </Form.Item>
          </div>
          <div className="flex items-center h-[40px]">
            <p className="w-[120px] text-left text-[#0071BA]">Hệ thống</p>
            <Form.Item
              className="!mb-0 w-full"
              name="system"
              rules={[
                {
                  required: true,
                  message: "Trường này là bắt buộc"
                }
              ]}
            >
              <Select
                labelInValue
                options={systems.map((system) => ({ label: system.name, value: system.id}))}
                onChange={handleSystemChange}
                className="w-full h-full"
                allowClear
              />
            </Form.Item>
          </div>
          <div className="flex items-center h-[40px]">
            <p className="w-[120px] text-left text-[#0071BA]">HKD</p>
            <Form.Item
              className="!mb-0 w-full"
              name="group"
              rules={[
                {
                  required: true,
                  message: "Trường này là bắt buộc"
                }
              ]}
            >
              <Select
                labelInValue
                options={groups.filter((id) => id.system_id === selectedSystem).map((group) => ({ label: group.name, value: group.id }))}
                className="w-full h-full"
                allowClear
              />
            </Form.Item>
          </div>
          <div className="flex justify-evenly">
            <Button type="primary" danger onClick={onClose}>Hủy</Button>
            <Button type="primary" htmlType="submit" loading={loading}>Xác nhận</Button>
          </div>
        </Form>
      </div>
    </Modal>
  )
}

export default EditUser;