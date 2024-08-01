import Cookies from 'js-cookie';
import PasswordIcon from "../../assets/icons/PasswordIcon";
import UserIcon from "../../assets/icons/UserIcon";
import BaseButton from "../../components/common/BaseButton";
import { Form, Input } from "antd";
import { LoginService } from "../../services/auth";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import withAuth from '../../hocs/withAuth';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../../zustand/auth.store';
import { useNotification } from '../../hooks/useNotification';
import { useChangePasswordStore } from '../../zustand/isChangePasswod.store';

interface FormValue {
  username: string;
  password: string;
}

function Login() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm<FormValue>()
  const navigate = useNavigate();
  const { getUser } = useAuthStore();
  const { setIsChangePassword } = useChangePasswordStore();

  useEffect(() => {
    document.title = "Đăng nhập"
    Cookies.remove('token');
  }, []);

  const notification = useNotification();

  const onSubmit = async (formValue: FormValue) => {
    setLoading(true)
    try {
      const res = await LoginService(formValue);
      notification.success("Đăng nhập thành công")
      setIsChangePassword(formValue.username !== formValue.password)
      const { data } = res
      Cookies.set('token', data.data.token, { expires: data.data.timeout / (1000 * 60 * 60 * 24) });
      if (formValue.username === formValue.password) {
        navigate('/thay-doi-mat-khau', { state: { password_old: formValue.password }})
      } else {
        await getUser();
        navigate('/')
      }
    } catch (err) {
      console.log(err)
      notification.error("Đăng nhập không thành công")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="bg-[url('./assets/background-login.jpg')] bg-no-repeat bg-auto w-screen h-screen bg-center flex items-center justify-center">
        <div className="md:w-6/12 bg-white opacity-80 rounded-md p-8">
          <div className="text-[#0071BA] uppercase text-3xl font-bold py-8 text-center">
            <p>Đăng nhập</p>
          </div>
          <Form
            form={form}
            className="flex flex-col"
            onFinish={onSubmit}
          >
            <Form.Item
              className="!mb-0 py-2"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Trường này là bắt buộc"
                }
              ]}
              >
                <Input
                    placeholder="Tên đăng nhập"
                    size="large"
                    addonBefore={
                      <div className="w-8 h-8 rounded-full bg-[#0071ba] flex items-center justify-center">
                        <UserIcon />
                      </div>
                    }
                  />
            </Form.Item>
            <Form.Item
              className="!mb-0 py-2"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Trường này là bắt buộc"
                }
              ]}
              >
                <Input.Password
                  placeholder="Mật khẩu"
                  size="large"
                  addonBefore={
                    <div className="w-8 h-8 rounded-full bg-[#0071ba] flex items-center justify-center">
                      <PasswordIcon />
                    </div>
                  }
                  iconRender={
                    (visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)
                  }
                />
            </Form.Item>
            
            <div className="flex justify-center my-4">
              <BaseButton
                color="info"
                className="text-white" style={{outline: 'none'}}
                type="submit"
                loading={loading}
              >
                Đăng nhập
              </BaseButton>
            </div>
          </Form>
        </div>
      </div>
    </>
  )
}

const LoginWithAuth =  withAuth(Login, false);

export default LoginWithAuth;
