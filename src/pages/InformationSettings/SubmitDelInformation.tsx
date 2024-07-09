import CloseIcon from "../../assets/icons/CloseIcon";
import BaseButton from "../../components/common/BaseButton";
import ButtonIcon from "../../components/common/ButtonIcon";

interface SubmitDelInformationProps {
  onClose: () => void;
  title: string;
  onRemoveData: () => void
}

function SubmitDelInformation(props: SubmitDelInformationProps) {
  const { onClose, title, onRemoveData } = props;
  const onSubmit = () => {
    onRemoveData()
    onClose()
  }
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
        <h2 className="p-4 text-xl">Bạn có muốn xóa không?</h2>
        <div className="flex justify-center gap-12 p-4">
          <BaseButton color="danger" onClick={onClose}>Hủy</BaseButton>
          <BaseButton color="info" onClick={onSubmit}>Xác nhận</BaseButton>
        </div>
      </div>
    </div>
  )
}

export default SubmitDelInformation;