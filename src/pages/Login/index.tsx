import PasswordIcon from "../../assets/icons/PasswordIcon";
import UserIcon from "../../assets/icons/UserIcon";
import BaseButton from "../../components/common/BaseButton";
import BaseInput from "../../components/common/BaseInput";

function Login() {
  return (
    <div className="bg-[url('./assets/background-login.jpg')] bg-no-repeat bg-auto w-screen h-screen bg-center flex items-center justify-center">
      <div className="w-6/12 bg-white opacity-80 rounded-md p-8">
        <div className="text-[#0071BA] uppercase text-3xl font-bold py-8 text-center">
          <p>Đăng nhập</p>
        </div>
        <form className="flex flex-col gap-4">
          <BaseInput
            placeholder="Tên đăng nhập"
            startIcon={
              <div className="w-8 h-8 rounded-full bg-[#0071ba] flex items-center justify-center">
                <UserIcon />
              </div>
            }
          />
          <BaseInput
            placeholder="Mật khẩu"
            startIcon={
              <div className="w-8 h-8 rounded-full bg-[#0071ba] flex items-center justify-center">
                <PasswordIcon />
              </div>
            }
          />
          <div className="flex justify-center">
            <BaseButton color="info" className="text-white" style={{outline: 'none'}}>
              Đăng nhập
            </BaseButton>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;
