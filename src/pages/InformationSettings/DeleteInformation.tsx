import { Button, Modal } from "antd";
interface DeleteInformationProps {
  onClose: () => void;
  title: string;
  onDelete: (type: string, id: number) => Promise<void>;
  type: string;
  id: number;
  loadingDelete: boolean;
  open: boolean;
}

function DeleteInformation(props: DeleteInformationProps) {
  const { onClose, title, onDelete, type, id, loadingDelete, open } = props;
  const onSubmit = async() => {
    await onDelete(type, id)
    onClose()
  }
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={false}
    >
      <div className="w-full text-center p-3 h-[50px] bg-[#eb9d4d] rounded-t-md uppercase font-bold">{title}</div>
      <h2 className="p-4 text-xl text-center">Bạn có muốn xóa không?</h2>
      <div className="flex justify-center gap-12 p-4">
        <Button type="primary" danger onClick={onClose}>Hủy</Button>
        <Button type="primary" color="info" onClick={onSubmit} loading={loadingDelete}>Xác nhận</Button>
      </div>
    </Modal>
  )
}

export default DeleteInformation;