import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import { changePassword } from '../../services/auth';
import { useNotification } from '../../hooks/useNotification';
import { useLocation, useNavigate } from 'react-router-dom';
import { useChangePasswordStore } from '../../zustand/isChangePasswod.store';


interface FormValues {
  password_new: string;
  confirm_password_new: string;
}

function ChangePasswordPage() {
  const location = useLocation();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { setIsChangePassword } = useChangePasswordStore();

  const notification = useNotification();
  const navigate = useNavigate()

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      await changePassword({ password_old: location.state.password_old, password_new: data.password_new })
      setIsChangePassword(location.state.password_old !== data.password_new);
      navigate('/');
      notification.success('Thay đổi mật khẩu thành công')
    } catch (err) {
      notification.error('Thay đổi mật khẩu thất bại')
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-screen flex justify-center">
      <div className="w-1/2 border-black border-2 rounded-xl">
        <div className="w-full text-center p-3 h-[60px] leading-[36px] bg-[#0071BA] rounded-t-lg uppercase font-bold">Đổi mật khẩu</div>
        <div className="p-4 my-4">
          <Form onFinish={onSubmit} form={form} className="flex flex-col gap-6">
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
              <Button type="primary" danger onClick={() => navigate('/login')}>Hủy</Button>
              <Button type="primary" htmlType="submit" loading={loading}>Xác nhận</Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default ChangePasswordPage