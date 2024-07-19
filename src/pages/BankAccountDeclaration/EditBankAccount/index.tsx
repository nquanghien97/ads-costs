import { Form, Input, Modal, Select } from "antd";
import BaseButton from "../../../components/common/BaseButton";
import { useEffect, useState } from "react";
import { getBankAccount } from "../../../services/bank_account";
import { BankAccountType } from "../../../entities/BankAccount";
import { useInformationSettingsStore } from "../../../zustand/information_settings.store";
import optionsBankStatus from "../../../config/bank_status";
import { useGroupsStore } from "../../../zustand/groups.store";
import { useSystemsStore } from "../../../zustand/systems.store";

interface EditBankAccountProps {
  onClose: () => void;
  open: boolean;
  bankId: number;
}

const optionsName = [
  { label: 'Nguyen Van A', value: 1 },
  { label: 'Nguyen Van B', value: 2 },
  { label: 'Nguyen Van C', value: 3 },
];

function EditBankAccount(props: EditBankAccountProps) {
  const { onClose, bankId, open } = props;
  const { banks } = useInformationSettingsStore();
  const [selectedSystem, setSelectedSystem] = useState(-1);
  const { groups } = useGroupsStore();
  const { systems } = useSystemsStore();

  const [form] = Form.useForm();

  const handleSystemChange = (option: number) => {
    setSelectedSystem(option)
    form.setFieldsValue({ group_id: null });
  }

  useEffect(() => {
    (async() => {
      const res = await getBankAccount(bankId);
      const bankData = res.data.data as BankAccountType
      form.setFieldsValue({
        name: bankData.name,
        user_id: bankData.user_id,
        card_number: bankData.card_number,
        status: bankData.status,
        bank_id: bankData.bank_id
      })
    })()
  })

  const onFinish = (data: unknown) => {
    console.log(data)
  }

  return (
      <Modal
        open={open}
        className='!p-0 !w-5/6'
        onCancel={onClose}
        footer={false}
      >
        <div>
          <div className="w-full text-center p-3 h-[50px] bg-[#0071BA] rounded-t-md uppercase font-bold">Chỉnh sửa thông tin tài khoản ngân hàng</div>
        </div>
        <div className="p-4 my-4">
          <Form
            form={form}
            onFinish={onFinish}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center h-[40px]">
              <p className="w-[120px] text-left text-[#0071BA]">Hệ thống</p>
              <Form.Item
                className="!mb-0 w-full"
                name="system"
              >
                <Select
                  onChange={handleSystemChange}
                  options={systems.map((system) => ({ label: system.name, value: system.id}))}
                  className="w-full h-full"
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
                  options={optionsName}
                  className="w-full h-full"
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
                  options={optionsName}
                  className="w-full h-full"
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
                  options={banks.map(item => ({label: item.name, value: item.id}))}
                  className="w-full h-full"
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
                />
              </Form.Item>
            </div>
            <div className="flex justify-evenly">
              <BaseButton color="danger" onClick={onClose}>Hủy</BaseButton>
              <BaseButton color="success" type="submit">Xác nhận</BaseButton>
            </div>
          </Form>
        </div>
      </Modal>
  )
}

export default EditBankAccount;