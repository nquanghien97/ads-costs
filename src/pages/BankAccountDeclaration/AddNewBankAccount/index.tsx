import { Button, Form, Input, Select } from "antd";
import CloseIcon from "../../../assets/icons/CloseIcon";
import ButtonIcon from "../../../components/common/ButtonIcon";
import { useSystemsStore } from "../../../zustand/systems.store";
import { useGroupsStore } from "../../../zustand/groups.store";
import { useEffect, useState } from "react";
import { useInformationSettingsStore } from "../../../zustand/information_settings.store";
import optionsBankStatus from "../../../config/bank_status";
import User from "../../../entities/User";
import { getUsersBySystemGroup } from "../../../services/users";
import { addBankAccount } from "../../../services/bank_account";
import { useNotification } from "../../../hooks/useNotification";


interface FormValues {
  system: string;
  groups: string;
  name: {
    label: string;
    value: number;
  };
  username: number;
  card_number: string;
  bank_id: number;
  status: string;
}
interface AddNewBankAccountProps {
  onClose: () => void;
  setRefreshKey: React.Dispatch<React.SetStateAction<boolean>>
}

function AddNewBankAccount(props: AddNewBankAccountProps) {
  const { onClose, setRefreshKey } = props;
  const { systems } = useSystemsStore();
  const { groups } = useGroupsStore();
  const { banks } = useInformationSettingsStore();
  const [selectedSystem, setSelectedSystem] = useState(-1);
  const [selectedUser, setSelectedUser] = useState('');
  const [value, setValue] = useState({
    system_id: -1,
    group_id: -1,
  });
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getUsersBySystemGroup(value)
      setUsers(res.data.data.list);
    })()
  }, [value])

  const handleSystemChange = (option: number) => {
    setSelectedSystem(option)
    form.setFieldsValue({ group: null });
    form.setFieldsValue({ name: null });
    form.setFieldsValue({ username: null })
  };

  const handleGroupChange = () => {
    form.setFieldsValue({ name: null })
    form.setFieldsValue({ username: null });
  }

  const handleUserChange = (
    option: {
      label: string,
      value: number
    }
  ) => {
    setSelectedUser(option.label)
    form.setFieldsValue({ username: null })
  };
  const notification = useNotification();
  const [form] = Form.useForm();

  const onFinish = async (data: FormValues) => {
    setLoading(true);
    const submitData = {
      user_id: data.username,
      name: data.name.label,
      card_number: data.card_number,
      bank_id: data.bank_id,
      status: data.status
    }
    try {
      await addBankAccount(submitData);
      onClose();
      setRefreshKey(pre => !pre)
      notification.success('Khai báo tài khoản ngân hàng thành công')
    } catch (err){
      console.log(err)
      notification.success('Khai báo tài khoản ngân hàng không thành công')
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-[#0000004d] z-50">
      <div className="w-[800px] relative rounded-xl bg-white left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col">
        <div>
          <div className="w-full text-center p-3 h-[50px] bg-[#0071BA] rounded-t-xl uppercase font-bold">Khai báo tài khoản ngân hàng</div>
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
            onValuesChange={(changedValues) => {
              setValue(preValue => ({
                ...preValue,
                system_id: changedValues.system || preValue.system_id,
                group_id: changedValues.group || preValue.group_id
              }))
            }}
          >
            <div className="flex items-center h-[40px]">
              <p className="w-[120px] text-left text-[#0071BA]">Hệ thống</p>
              <Form.Item
                className="!mb-0 w-full"
                name="system"
              >
                <Select
                  onChange={handleSystemChange}
                  options={systems.map((system) => ({ label: system.name, value: system.id }))}
                  className="w-full h-full"
                  allowClear
                />
              </Form.Item>
            </div>
            <div className="flex items-center h-[40px]">
              <p className="w-[120px] text-left text-[#0071BA]">Hộ kinh doanh</p>
              <Form.Item
                className="!mb-0 w-full"
                name="group"
              >
                <Select
                  options={groups.filter((id) => id.system_id === selectedSystem).map((group) => ({ label: group.name, value: group.id }))}
                  className="w-full h-full"
                  onChange={handleGroupChange}
                  allowClear
                />
              </Form.Item>
            </div>
            <div className="flex items-center h-[40px]">
              <p className="w-[120px] text-left text-[#0071BA]">Họ và tên</p>
              <Form.Item
                className="!mb-0 w-full"
                name="name"
              >
                <Select
                  labelInValue
                  options={users.map(user => ({ label: user.name, value: user.id }))}
                  className="w-full h-full"
                  onChange={(_, option) => handleUserChange(option as { label: string; value: number })}
                  notFoundContent={<div>Loading...</div>}
                  allowClear
                />
              </Form.Item>
            </div>
            <div className="flex items-center h-[40px]">
              <p className="w-[120px] text-left text-[#0071BA]">Mã MKT</p>
              <Form.Item
                className="!mb-0 w-full"
                name="username"
              >
                <Select
                  options={users.filter(user => user.name === selectedUser).map(item => ({ label: item.username, value: item.id }))}
                  className="w-full h-full"
                  notFoundContent={<div>Loading...</div>}
                  allowClear
                />
              </Form.Item>
            </div>
            <div className="flex items-center h-[40px]">
              <p className="w-[120px] text-left text-[#0071BA]">Số TKNH</p>
              <Form.Item
                className="!mb-0 w-full"
                name="card_number"
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
              <p className="w-[120px] text-left text-[#0071BA]">Tên TKNH</p>
              <Form.Item
                className="!mb-0 w-full"
                name="bank_id"
              >
                <Select
                  options={banks.map(item => ({ label: item.name, value: item.id }))}
                  className="w-full h-full"
                  allowClear
                />
              </Form.Item>
            </div>
            <div className="flex items-center h-[40px]">
              <p className="w-[120px] text-left text-[#0071BA]">Trạng thái sử dụng</p>
              <Form.Item
                className="!mb-0 w-full"
                name="status"
              >
                <Select
                  options={optionsBankStatus}
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
      </div>
    </div>
  )
}

export default AddNewBankAccount;