import CloseIcon from "../../../assets/icons/CloseIcon"
import ButtonIcon from "../../../components/common/ButtonIcon"

interface InvoiceDetailsProps {
  onClose: () => void;
}

function InvoiceDetails(props: InvoiceDetailsProps) {
  const { onClose } = props
  return (
    <div className="fixed inset-0 bg-[#0000004d] z-50">
      <div className="w-[800px] h-[300px] relative rounded-xl bg-white left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 flex">
        <div className="w-full text-center p-3 h-[50px] bg-[#eb9d4d] rounded-t-xl uppercase font-bold">Chi tiết hóa đơn</div>
        <div className="absolute right-2 top-2" onClick={onClose}>
          <ButtonIcon>
            <CloseIcon />
          </ButtonIcon>
        </div>
      </div>
    </div>
  )
}

export default InvoiceDetails