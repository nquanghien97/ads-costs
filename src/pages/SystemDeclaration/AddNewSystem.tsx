import { Button, Form, Input, Modal } from 'antd'
import SystemType from '../../entities/System';
import { useState } from 'react';
import { addSystem } from '../../services/systems';
import { useNotification } from '../../hooks/useNotification';

interface AddNewSystemProps {
  open: boolean;
  onCancel: () => void;
  setSystems: React.Dispatch<React.SetStateAction<SystemType[]>>
}

export default function AddNewSystem(props: AddNewSystemProps) {
  const { open, onCancel, setSystems } = props
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const [form] = Form.useForm();

  const notification = useNotification();

  const onSubmit = async (data: { name: string }) => {
    setLoadingSubmit(true);
    try {
      const res = await addSystem(data.name);
      setSystems((prev) => [...prev, res.data.data])
      onCancel();
      form.resetFields();
      notification.success('Thêm mới Hệ thống thành công')
    } catch (err) {
      console.log(err);
      notification.error('Thêm mới Hệ thống thất bại')
    } finally {
      setLoadingSubmit(false);
    }
  }

  return (
    <Modal
      open={open}
      className='!p-0'
      onCancel={onCancel}
      footer={false}
    >
      <div className="w-full text-center p-3 h-[60px] leading-[36px] bg-[#0071BA] rounded-t-lg uppercase font-bold">Thêm mới hệ thống</div>
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
          <Button type="primary" danger onClick={onCancel}>Hủy</Button>
          <Button type="primary" htmlType="submit" loading={loadingSubmit}>Xác nhận</Button>
        </div>
      </Form>
    </Modal>
  )
}
