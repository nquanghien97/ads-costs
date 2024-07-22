import { Button, Form, Input, Modal } from "antd";

interface AddNewInformationProps {
  onClose: () => void;
  title: string;
  onAdd: (type: string, name: string) => Promise<void>;
  type: string;
  loadingAdd: boolean;
  open: boolean;
}

interface FormValue {
  name: string
}

function AddNewInformation(props: AddNewInformationProps) {
  const [form] = Form.useForm<FormValue>();
  const { onClose, title, onAdd, type, loadingAdd, open } = props;
  const onSubmit = async (data: { name: string }) => {
    await onAdd(type, data.name)
    onClose()
  }
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={false}
    >
        <div>
          <div className="w-full text-center p-3 h-[50px] bg-[#eb9d4d] rounded-t-md uppercase font-bold">{title}</div>
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
    </Modal>
  )
}

export default AddNewInformation;