import { Button, Form, Input, Modal } from 'antd'
import { useState } from 'react';
import { editGroup } from '../../../services/groups';
import GroupType from '../../../entities/Group';
import { useParams } from 'react-router-dom';
import { useNotification } from '../../../hooks/useNotification';

interface EditGroupProps {
  open: boolean;
  group: {
    id: number;
    name: string;
  };
  onCancel: () => void;
  setGroupps: React.Dispatch<React.SetStateAction<GroupType[]>>
}

export default function EditGroup(props: EditGroupProps) {
  const params = useParams();
  const { open, group, onCancel, setGroupps } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const systemId = params.systemId || '0'

  const notification = useNotification();

  const onSubmit = async (value: { name: string}) => {
    setLoading(true);
    try {
      await editGroup(group.id, { name: value.name, system_id: +systemId })
      setGroupps((prev) => prev?.map((i) => (i.id === group.id ? {id: group.id, name: value.name, system_id: i.system_id} : i)));
      onCancel();
      notification.success('Chỉnh sửa Hộ kinh doanh thành công')
    } catch(err) {
      console.log(err);
      notification.error('Chỉnh sửa Hộ kinh doanh thất bại')
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
      <div className="w-full text-center p-3 h-[60px] leading-[36px] bg-[#0071BA] rounded-t-lg uppercase font-bold">Chỉnh sửa hộ kinh doanh</div>
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
          initialValue={group.name}
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
