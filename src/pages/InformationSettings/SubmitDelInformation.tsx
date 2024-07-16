import { Button } from "antd";
import CloseIcon from "../../assets/icons/CloseIcon";
import ButtonIcon from "../../components/common/ButtonIcon";

interface SubmitDelInformationProps {
  onClose: () => void;
  title: string;
  onDelete: (type: string, id: number) => Promise<void>;
  type: string;
  id: number;
  loadingDelete: boolean;
}

function SubmitDelInformation(props: SubmitDelInformationProps) {
  const { onClose, title, onDelete, type, id, loadingDelete } = props;
  const onSubmit = async() => {
    await onDelete(type, id)
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
          <Button type="primary" danger onClick={onClose}>Hủy</Button>
          <Button type="primary" color="info" onClick={onSubmit} loading={loadingDelete}>Xác nhận</Button>
        </div>
      </div>
    </div>
  )
}

export default SubmitDelInformation;