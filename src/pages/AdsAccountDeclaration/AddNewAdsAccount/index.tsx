import Select from "react-select";
import CloseIcon from "../../../assets/icons/CloseIcon";
import BaseButton from "../../../components/common/BaseButton";
import BaseInput from "../../../components/common/BaseInput";
import ButtonIcon from "../../../components/common/ButtonIcon";

interface InvoiceDetailsProps {
  onClose: () => void;
}

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

function AddNewAdsAccount(props: InvoiceDetailsProps) {
  const { onClose } = props;
  return (
    <div className="fixed inset-0 bg-[#0000004d] z-50">
      <div className="w-[800px] relative rounded-xl bg-white left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col">
        <div>
          <div className="w-full text-center p-3 h-[50px] bg-[#0071BA] rounded-t-xl uppercase font-bold">Khai báo tài khoản quảng cáo</div>
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
              <p className="w-[120px] text-left text-[#0071BA]">ID TKQC</p>
              <BaseInput fullWidth />
            </div>
            <div className="flex items-center">
              <p className="w-[120px] text-left text-[#0071BA]">Tên TKQC</p>
              <BaseInput fullWidth />
            </div>
            <div className="flex items-center">
              <p className="w-[120px] text-left text-[#0071BA]">Kênh chạy</p>
              <Select options={options} className="w-full" />
            </div>
            <div className="flex items-center">
              <p className="w-[120px] text-left text-[#0071BA]">Loại TKQC</p>
              <Select options={options} className="w-full" />
            </div>
            <div className="flex items-center">
              <p className="w-[120px] text-left text-[#0071BA]">Tiền tệ</p>
              <Select options={options} className="w-full cursor-pointer" />
            </div>
            <div className="flex items-center">
              <p className="w-[120px] text-left text-[#0071BA]">Múi giờ</p>
              <Select options={options} className="w-full" />
            </div>
            <div className="flex items-center">
              <p className="w-[120px] text-left text-[#0071BA]">Tỷ giá</p>
              <BaseInput fullWidth />
            </div>
            <div className="flex items-center">
              <p className="w-[120px] text-left text-[#0071BA]">Phí thuê</p>
              <BaseInput fullWidth />
            </div>
            <div className="flex items-center">
              <p className="w-[120px] text-left text-[#0071BA]">Trạng thái TKQC</p>
              <Select options={options} className="w-full" />
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

export default AddNewAdsAccount;