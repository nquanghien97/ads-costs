import { Alert, Button, Form, Input, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { editBankAccount, getBankAccount } from "../../../services/bank_account";
import { BankAccountType } from "../../../entities/BankAccount";
import { useInformationSettingsStore } from "../../../zustand/information_settings.store";
import optionsBankStatus from "../../../config/bank_status";
import User from "../../../entities/User";
import { getUser } from "../../../services/users";
import { useNotification } from "../../../hooks/useNotification";

interface EditBankAccountProps {
  onClose: () => void;
  open: boolean;
  bankId: number;
  setRefreshKey: React.Dispatch<React.SetStateAction<boolean>>
}

interface FormValues {
  system: string;
  groups: string;
  name: string;
  username: {
    value: number
  };
  card_number: string;
  bank_id: number;
  status: string;
}

function EditBankAccount(props: EditBankAccountProps) {
  const { onClose, bankId, open, setRefreshKey } = props;
  const [loading, setLoading] = useState(false);
  const { banks } = useInformationSettingsStore();
  const [user, setUser] = useState<User>();
  const [bankAccountData, setBankAccountData] = useState<BankAccountType>({
    id: -1,
    user_id: -1,
    name: 'string',
    card_number: 'string',
    bank_name: 'string',
    bank_id: -1,
    status: 'string',
  })

  const [form] = Form.useForm();

  const notification = useNotification();

  useEffect(() => {
    (async () => {
      const res = await getBankAccount(bankId);
      const bankData = res.data.data as BankAccountType
      setBankAccountData(bankData)
      console.log(bankData)
      const resUser = await getUser(bankData.user_id)
      setUser(resUser.data.data)
      form.setFieldsValue({
        card_number: bankData.card_number,
        status: bankData.status,
        bank_id: bankData.bank_id,
      })
    })()
  }, [bankId, form])

  const onFinish = async (data: FormValues) => {
    setLoading(true);
    try {
      const valuesSubmit = {
        user_id: user?.id || -1,
        name: user?.name || '',
        card_number: data.card_number,
        bank_id: data.bank_id,
        status: data.status
      }
      await editBankAccount(bankAccountData?.id, valuesSubmit)
      onClose();
      setRefreshKey(pre => !pre)
      notification.success('Chỉnh sửa tài khoản ngân hàng thành công')
    } catch (err) {
      console.log(err)
      notification.error('Chỉnh sửa tài khoản ngân hàng thất bại')
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
            <Alert message={user?.system === undefined
              ? 'Loading...'
              : user?.system === null
                ? 'không có hệ thống'
                : user?.system?.name} className="w-full" />
          </div>
          <div className="flex items-center h-[40px]">
            <p className="w-[120px] text-left text-[#0071BA]">Hộ kinh doanh</p>
            <Alert message={user?.group?.name || "Loading..."} className="w-full" />
          </div>
          <div className="flex items-center h-[40px]">
            <p className="w-[120px] text-left text-[#0071BA]">Họ và tên</p>
            <Alert message={user?.name || "Loading..."} className="w-full" />
          </div>
          <div className="flex items-center h-[40px]">
            <p className="w-[120px] text-left text-[#0071BA]">Mã MKT</p>
            <Alert message={user?.username || "Loading..."} className="w-full" />
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
            <Button type="primary" danger onClick={onClose}>Hủy</Button>
            <Button type="primary" htmlType="submit" loading={loading}>Xác nhận</Button>
          </div>
        </Form>
      </div>
    </Modal>
  )
}

export default EditBankAccount;