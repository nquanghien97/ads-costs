import { Button, Form, Input, Modal } from "antd";
import { InformationSettingType } from "../../entities/InformationSetting";
import { useEffect } from "react";

interface EditInformationProps {
  onClose: () => void;
  title: string;
  onEdit: (type: string, data: InformationSettingType) => Promise<void>;
  id: number;
  name: string;
  type: string;
  loadingEdit: boolean;
  open: boolean;
}

interface FormValue {
  name: string
}

function EditInformation(props: EditInformationProps) {
  const [form] = Form.useForm<FormValue>();
  const { onClose, title, onEdit, id, name, loadingEdit, type, open } = props;


  useEffect(() => {
    form.setFieldsValue({ name: name })
  }, [form, name])

  const onSubmit = async (data: { name: string }) => {
    await onEdit(type, {id: id, name: data.name})
    onClose()
  }
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={false}
    >
      <div>
        <div className="w-full text-center p-3 h-[50px] bg-[#eb9d4d] rounded-t-md uppercase font-bold">{`Chỉnh sửa ${title}`}</div>
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
          initialValue={name}
          >
            <Input
              placeholder="Nhập thông tin"
              className="py-4"
            />
        </Form.Item>
        <div className="flex justify-center gap-12 p-4">
          <Button type="primary" danger onClick={onClose}>Hủy</Button>
          <Button type="primary" htmlType="submit" loading={loadingEdit}>Xác nhận</Button>
        </div>
      </Form>
    </Modal>
  )
}

export default EditInformation;