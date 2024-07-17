import { Form, Input, Select } from "antd";
import CloseIcon from "../../../assets/icons/CloseIcon";
import BaseButton from "../../../components/common/BaseButton";
import ButtonIcon from "../../../components/common/ButtonIcon";
import { useSystemsStore } from "../../../zustand/systems.store";
import { useGroupsStore } from "../../../zustand/groups.store";
import { useState } from "react";

interface AddNewUserProps {
  onClose: () => void;
}

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

function AddNewUser(props: AddNewUserProps) {
  const { onClose } = props;
  const { systems } = useSystemsStore();
  const { groups } = useGroupsStore();
  const [selectedSystem, setSelectedSystem] = useState(-1);

  const handleSystemChange = (option: number) => {
    setSelectedSystem(option)
    form.setFieldsValue({ group: null });
  }

  const [form] = Form.useForm();

  const onFinish = (data: unknown) => {
    console.log(data)
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
                <Input className="py-2" />
              </Form.Item>
            </div>
            <div className="flex items-center h-[40px]">
              <p className="w-[120px] text-left text-[#0071BA]">Xác nhận mật khẩu</p>
              <Form.Item
                className="!mb-0 w-full"
                name="confirmPassword"
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
            {/* <div className="flex items-center h-[40px]">
              <p className="w-[120px] text-left text-[#0071BA]">Chức vụ</p>
              <Form.Item
                className="!mb-0 w-full"
                name="role"
              >
                <Select
                  options={options}
                  className="w-full h-full"
                />
              </Form.Item>
            </div> */}
            <div className="flex items-center h-[40px]">
              <p className="w-[120px] text-left text-[#0071BA]">Hệ thống</p>
              <Form.Item
                className="!mb-0 w-full"
                name="system"
              >
                <Select
                  className="w-full h-full"
                  onChange={handleSystemChange}
                  value={selectedSystem}
                  options={systems.map((system) => ({ label: system.name, value: system.id}))}
                />
              </Form.Item>
            </div>
            <div className="flex items-center h-[40px]">
              <p className="w-[120px] text-left text-[#0071BA]">HKD</p>
              <Form.Item
                className="!mb-0 w-full"
                name="group"
              >
                <Select
                  className="w-full h-full"
                  options={groups.filter((id) => id.system_id === selectedSystem).map((group) => ({ label: group.name, value: group.id }))}
                />
              </Form.Item>
            </div>
            <div className="flex justify-evenly">
              <BaseButton color="danger" onClick={onClose}>Hủy</BaseButton>
              <BaseButton color="success" type="submit">Xác nhận</BaseButton>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default AddNewUser;