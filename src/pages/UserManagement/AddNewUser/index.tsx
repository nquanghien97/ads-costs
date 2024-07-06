import { Select } from "antd";
import CloseIcon from "../../../assets/icons/CloseIcon";
import BaseButton from "../../../components/common/BaseButton";
import BaseInput from "../../../components/common/BaseInput";
import ButtonIcon from "../../../components/common/ButtonIcon";

interface AddNewUserProps {
  onClose: () => void;
}

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

function AddNewUser(props: AddNewUserProps) {
  const { onClose } = props;
  return (
    <div className="fixed inset-0 bg-[#0000004d] z-50">
      <div className="w-[800px] relative rounded-xl bg-white left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col">
        <div>
          <div className="w-full text-center p-3 h-[50px] bg-[#0071BA] rounded-t-xl uppercase font-bold">Khai báo tài khoản ngân hàng</div>
          <div className="absolute right-2 top-2" onClick={onClose}>
            <ButtonIcon>
              <CloseIcon />
            </ButtonIcon>
          </div>
        </div>
        <div className="p-4 my-4">
          <form
            className="flex flex-col gap-6"
          >
            <div className="flex items-center">
              <p className="w-[120px] text-left text-[#0071BA]">Mã</p>
              <BaseInput fullWidth />
            </div>
            <div className="flex items-center">
              <p className="w-[120px] text-left text-[#0071BA]">Họ tên</p>
              <BaseInput fullWidth />
            </div>
            <div className="flex items-center">
              <p className="w-[120px] text-left text-[#0071BA]">Mật khẩu</p>
              <BaseInput fullWidth />
            </div>
            <div className="flex items-center">
              <p className="w-[120px] text-left text-[#0071BA]">Xác nhận mật khẩu</p>
              <BaseInput fullWidth />
            </div>
            <div className="flex items-center">
              <p className="w-[120px] text-left text-[#0071BA]">Chức vụ</p>
              <Select options={options} className="w-full" placeholder="Chọn quyền" />
            </div>
            <div className="flex items-center">
              <p className="w-[120px] text-left text-[#0071BA]">Hệ thống</p>
              <Select options={options} className="w-full" placeholder="Chọn hệ thống" />
            </div>
            <div className="flex items-center">
              <p className="w-[120px] text-left text-[#0071BA]">HKD</p>
              <Select options={options} className="w-full" placeholder="Chọn HKD" />
            </div>
            <div className="flex justify-evenly">
              <BaseButton color="danger" onClick={onClose}>Hủy</BaseButton>
              <BaseButton color="success">Xác nhận</BaseButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddNewUser;