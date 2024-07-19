import { Button, Form, Input, Modal } from 'antd'
import GroupType from '../../entities/Group';
import { useState } from 'react';
import { addGroup } from '../../services/groups';

interface AddNewGroupProps {
  open: boolean;
  onCancel: () => void;
  setGroups: React.Dispatch<React.SetStateAction<GroupType[]>>
  system_id: number;
}

export default function AddNewGroup(props: AddNewGroupProps) {
  const { open, onCancel, setGroups, system_id } = props
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const [form] = Form.useForm();

  const onSubmit = async (data: { name: string }) => {
    setLoadingSubmit(true);
    try {
      const res = await addGroup(data.name, system_id);
      setGroups((prev) => [...prev, res.data.data])
      onCancel();
      form.resetFields();
    } catch (err) {
      console.log(err);
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
      <div className="w-full text-center p-3 h-[60px] leading-[36px] bg-[#0071BA] rounded-t-lg uppercase font-bold">Thêm mới hộ kinh doanh</div>
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
