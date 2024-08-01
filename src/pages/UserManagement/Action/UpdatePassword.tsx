import { Button, Form, Input, Modal } from 'antd'
import { useState } from 'react';
import { updatePassword } from '../../../services/users';
import { useNotification } from '../../../hooks/useNotification';

interface UpdatePasswordProps {
  onCancel: () => void;
  open: boolean;
  onOk: () => void;
  user_id: number
}

interface FormValue {
  password: string;
  confirm_password: string;
}

function UpdatePassword(props: UpdatePasswordProps) {
  const { onCancel, open, user_id } = props;
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const [form] = Form.useForm();

  const notification = useNotification();
  
  const onSubmit = async (data: FormValue) => {
    setLoadingSubmit(true);
    try {
      await updatePassword({
        user_id,
        password: data.password,
        confirm_password: data.confirm_password
      })
      notification.success("Cập nhật mật khẩu thành công")
      onCancel();
    } catch (err) {
      console.log(err)
      notification.error("Cập nhật mật khẩu không thành công")
    } finally {
      setLoadingSubmit(false);
    }
  }

  return (
    <>
      <Modal
        open={open}
        className='!p-0 !w-1/2'
        onCancel={onCancel}
        footer={false}
      >
        <div className="w-full text-center p-3 h-[60px] leading-[36px] bg-[#0071BA] rounded-t-lg uppercase font-bold">Cập nhật mật khẩu</div>
        <Form onFinish={onSubmit} form={form} className="p-4">
          <div className="flex items-center p-4">
            <p className="w-[200px] text-left text-[#0071BA]">Mật khẩu mới</p>
            <Form.Item
              className="!mb-0 w-full"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Trường này là bắt buộc"
                }
              ]}
              >
                <Input.Password
                  className="py-2"
                />
            </Form.Item>
          </div>
          <div className="flex items-center p-4">
            <p className="w-[200px] text-left text-[#0071BA]">Xác nhận mật khẩu mới</p>
            <Form.Item
              className="!mb-0 w-full"
              name="confirm_password"
              dependencies={['newPassword']}
              rules={[
                {
                  required: true,
                  message: "Trường này là bắt buộc"
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Mật khẩu xác nhận không chính xác'));
                  },
                }),
              ]}
              >
                <Input.Password
                  className="py-2"
                />
            </Form.Item>
          </div>
          <div className="flex justify-center gap-12 p-4">
            <Button type="primary" danger onClick={onCancel}>Hủy</Button>
            <Button type="primary" htmlType="submit" loading={loadingSubmit}>Xác nhận</Button>
          </div>
        </Form>
      </Modal>
    </>
  )
}

export default UpdatePassword