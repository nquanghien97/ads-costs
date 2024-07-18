import { Button, Form, Input, Modal } from 'antd';
import { useState } from 'react';
import { ChangePassword } from '../../services/auth';
import { NotificationInstance } from 'antd/es/notification/interface';

interface ChangePasswordModalProps {
  open: boolean,
  onClose: () => void;
  api: NotificationInstance
}

interface FormValues {
  password_old: string;
  password_new: string;
  confirm_password_new: string;
}

function ChangePasswordModal(props: ChangePasswordModalProps) {
  const { open, onClose, api } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      await ChangePassword({ password_old: data.password_old, password_new: data.password_new })
      onClose();
      api.success({
        message: 'Password changed',
        showProgress: true
      })
    } catch (err) {
      api.success({
        message: 'Lỗi',
        showProgress: true
      })
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Modal
        open={open}
        className='!p-0'
        onCancel={onClose}
        footer={false}
      >
        <div className="w-full text-center p-3 h-[60px] leading-[36px] bg-[#0071BA] rounded-t-lg uppercase font-bold">Đổi mật khẩu</div>
        <div className="p-4 my-4">
          <Form onFinish={onSubmit} form={form} className="flex flex-col gap-6">
            <div className="flex items-center h-[40px]">
              <p className="w-[120px] text-left text-[#0071BA]">Mật khẩu cũ</p>
              <Form.Item
                className="!mb-0 w-full"
                name="password_old"
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
              <p className="w-[120px] text-left text-[#0071BA]">Mật khẩu mới</p>
              <Form.Item
                className="!mb-0 w-full"
                name="password_new"
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
              <p className="w-[120px] text-left text-[#0071BA]">Xác nhận mật khẩu</p>
              <Form.Item
                className="!mb-0 w-full"
                name="confirm_password_new"
                rules={[
                  {
                    required: true,
                    message: "Trường này là bắt buộc"
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password_new') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Mật khẩu xác nhận không chính xác'));
                    },
                  }),
                ]}
              >
                <Input className="py-2" />
              </Form.Item>
            </div>
            <div className="flex justify-center gap-12 p-4">
              <Button type="primary" danger onClick={onClose}>Hủy</Button>
              <Button type="primary" htmlType="submit" loading={loading}>Xác nhận</Button>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  )
}

export default ChangePasswordModal