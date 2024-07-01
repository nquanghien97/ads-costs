import CloseIcon from "../../assets/icons/CloseIcon";
import BaseButton from "../../components/common/BaseButton";
import BaseInput from "../../components/common/BaseInput";
import ButtonIcon from "../../components/common/ButtonIcon";

interface AddNewInformationProps {
  onClose: () => void;
  title: string;
}

function AddNewInformation(props: AddNewInformationProps) {
  const { onClose, title } = props;
  return (
    <div className="fixed inset-0 bg-[#0000004d] z-50">
      <div className="w-[800px] relative rounded-xl bg-white left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col">
        <div>
          <div className="w-full text-center p-3 h-[50px] bg-[#eb9d4d] rounded-t-xl uppercase font-bold">{title}</div>
          <div className="absolute right-2 top-2" onClick={onClose}>
            <ButtonIcon>
              <CloseIcon />
            </ButtonIcon>
          </div>
        </div>
        <div className="flex justify-center w-4/5 m-auto py-8">
          <BaseInput placeholder="Nhập thông tin" fullWidth />
        </div>
        <div className="flex justify-center gap-12 p-4">
          <BaseButton color="info" onClick={onClose}>Hủy</BaseButton>
          <BaseButton color="danger">Xác nhận</BaseButton>
        </div>
      </div>
    </div>
  )
}

export default AddNewInformation;