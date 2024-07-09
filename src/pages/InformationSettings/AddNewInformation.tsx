import CloseIcon from "../../assets/icons/CloseIcon";
import BaseButton from "../../components/common/BaseButton";
import ButtonIcon from "../../components/common/ButtonIcon";
import { useId } from "react";
import { Form, Input } from "antd";

interface AddNewInformationProps {
  onClose: () => void;
  title: string;
  onAddNewData: (data: { id: string; name: string }) => void
}

interface FormValue {
  information: string
}

function AddNewInformation(props: AddNewInformationProps) {
  const id = useId();
  const [form] = Form.useForm<FormValue>();
  const { onClose, title, onAddNewData } = props;
  const onSubmit = (data: { information: string }) => {
   onAddNewData({id: id, name: data.information})
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
            name="information"
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
            <BaseButton color="danger" onClick={onClose}>Hủy</BaseButton>
            <BaseButton color="info" type="submit">Xác nhận</BaseButton>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default AddNewInformation;