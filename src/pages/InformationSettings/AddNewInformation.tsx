import CloseIcon from "../../assets/icons/CloseIcon";
import ButtonIcon from "../../components/common/ButtonIcon";
import { Button, Form, Input } from "antd";

interface AddNewInformationProps {
  onClose: () => void;
  title: string;
  onAdd: (type: string, name: string) => Promise<void>;
  type: string;
  loadingAdd: boolean;
}

interface FormValue {
  name: string
}

function AddNewInformation(props: AddNewInformationProps) {
  const [form] = Form.useForm<FormValue>();
  const { onClose, title, onAdd, type, loadingAdd } = props;
  const onSubmit = async (data: { name: string }) => {
    await onAdd(type, data.name)
    onClose()
  }
  return (
    <div className="fixed inset-0 bg-[#0000004d] z-50">
      <div className="w-[800px] relative rounded-xl bg-white left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col">
        <div>
          <div className="w-full text-center p-3 h-[50px] bg-[#eb9d4d] rounded-t-xl uppercase font-bold">{title}</div>
          <div className="absolute right-2 top-2" onClick={onClose}>
            <ButtonIcon>
              <CloseIcon />
            </ButtonIcon>
          </div>
        </div>
        <Form onFinish={onSubmit} form={form}>
          <Form.Item
            className="m-auto p-8 pb-4"
            name="name"
            rules={[
              {
                required: true,
                message: "Trường này là bắt buộc"
              }
            ]}
            >
              <Input
                placeholder="Nhập thông tin"
                className="py-4"
              />
          </Form.Item>
          <div className="flex justify-center gap-12 p-4">
            <Button type="primary" danger onClick={onClose}>Hủy</Button>
            <Button type="primary" htmlType="submit" loading={loadingAdd}>Xác nhận</Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default AddNewInformation;