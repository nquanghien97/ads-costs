import { Form, Input, Select } from "antd";
import CloseIcon from "../../../assets/icons/CloseIcon";
import BaseButton from "../../../components/common/BaseButton";
import ButtonIcon from "../../../components/common/ButtonIcon";
import { useState } from "react";
import { useGroupsStore } from "../../../zustand/groups.store";
import { useSystemsStore } from "../../../zustand/systems.store";
import { UserDTO } from "../../../dto/UserDTO";
import { addNewUser } from "../../../services/users";
import { roleOptions } from "../../../config/userRoleOption";
import { UserRole } from "../../../entities/User";

interface AddUserProps {
  onClose: () => void;
  setRefreshKey: React.Dispatch<React.SetStateAction<boolean>>
}

function AddUser(props: AddUserProps) {
  const { onClose, setRefreshKey } = props;
  const [selectedSystem, setSelectedSystem] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('')
  
  const { groups } = useGroupsStore();
  const { systems } = useSystemsStore();

  const handleSystemChange = (option: number) => {
    setSelectedSystem(option)
    form.setFieldsValue({ group_id: null });
  }

  const onRoleChange = (option: string) => {
    setRole(option)
  }

  const [form] = Form.useForm();

  const onFinish = async (data: UserDTO) => {
    setLoading(true);
    try {
      await addNewUser(data)
      setRefreshKey(pre => !pre);
      onClose();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-[#0000004d] z-50">
      <div className="w-[800px] relative rounded-xl bg-white left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col">
        <div>
          <div className="w-full text-center p-3 h-[50px] bg-[#0071BA] rounded-t-xl uppercase font-bold">Thêm mới người dùng</div>
          <div className="absolute right-2 top-2" onClick={onClose}>
            <ButtonIcon>
              <CloseIcon />
            </ButtonIcon>
          </div>
        </div>
        <div className="p-4 my-4">
          <Form
            form={form}
            onFinish={onFinish}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center h-[40px]">
              <p className="w-[120px] text-left text-[#0071BA]">Mã</p>
              <Form.Item
                className="!mb-0 w-full"
                name="username"
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
                  onChange={onRoleChange}
                  allowClear
                />
              </Form.Item>
            </div>
            <div className="flex items-center h-[40px]">
              <p className="w-[120px] text-left text-[#0071BA]">Hệ thống</p>
              <Form.Item
                className="!mb-0 w-full"
                name="system_id"
                rules={[
                  {
                    required: role !== UserRole.ROOT,
                    message: "Trường này là bắt buộc"
                  }
                ]}
              >
                <Select
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
                name="group_id"
                rules={[
                  {
                    required: role !== UserRole.ROOT,
                    message: "Trường này là bắt buộc"
                  }
                ]}
              >
                <Select
                  options={groups.filter((id) => id.system_id === selectedSystem).map((group) => ({ label: group.name, value: group.id }))}
                  className="w-full h-full"
                  allowClear
                />
              </Form.Item>
            </div>
            <div className="flex justify-evenly">
              <BaseButton color="danger" onClick={onClose}>Hủy</BaseButton>
              <BaseButton color="success" type="submit" loading={loading}>Xác nhận</BaseButton>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default AddUser;