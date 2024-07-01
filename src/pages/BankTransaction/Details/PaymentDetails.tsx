import CloseIcon from "../../../assets/icons/CloseIcon"
import ButtonIcon from "../../../components/common/ButtonIcon"

interface PaymentDetailsProps {
  onClose: () => void;
}

function PaymentDetails(props: PaymentDetailsProps) {
  const { onClose } = props
  return (
    <div className="fixed inset-0 bg-[#0000004d] z-50">
      <div className="w-[800px] h-[300px] relative rounded-xl bg-white left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 flex">
        <div className="w-full text-center p-3 h-[50px] bg-[#da9851] rounded-t-xl uppercase font-bold">Chi tiết tổng tiền nhận</div>
        <div className="absolute right-2 top-2" onClick={onClose}>
          <ButtonIcon>
            <CloseIcon />
          </ButtonIcon>
        </div>
      </div>
    </div>
  )
}

export default PaymentDetails