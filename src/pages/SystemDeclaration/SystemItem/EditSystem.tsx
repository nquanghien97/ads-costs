import { Button, Form, Input, Modal } from 'antd'
import { useState } from 'react';
import { editSystem } from '../../../services/systems';
import SystemType from '../../../entities/System';

interface EditSystemProps {
  open: boolean;
  system: {
    id: number;
    name: string;
  };
  onCancel: () => void;
  setSystems: React.Dispatch<React.SetStateAction<SystemType[]>>
}

export default function EditSystem(props: EditSystemProps) {
  const { open, system, onCancel, setSystems } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: { name: string}) => {
    setLoading(true);
    try {
      await editSystem({id: system.id, name: data.name})
      setSystems((prev) => prev?.map((i) => (i.id === system.id ? {id: system.id, name: data.name} : i)));
      onCancel();
    } catch(err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Modal
      open={open}
      className='!p-0'
      onCancel={onCancel}
      footer={false}
    >
      <div className="w-full text-center p-3 h-[60px] leading-[36px] bg-[#0071BA] rounded-t-lg uppercase font-bold">Chỉnh sửa hệ thống</div>
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
          initialValue={system.name}
          >
            <Input
              placeholder="Nhập thông tin"
              className="py-4"
            />
        </Form.Item>
        <div className="flex justify-center gap-12 p-4">
          <Button type="primary" danger onClick={onCancel}>Hủy</Button>
          <Button type="primary" htmlType="submit" loading={loading}>Xác nhận</Button>
        </div>
      </Form>
    </Modal>
  )
}
