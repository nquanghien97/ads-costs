import { Button, Modal } from "antd";
import { deleteSystem } from "../../../services/systems";
import { useState } from "react";
import SystemType from "../../../entities/System";
import { useNotification } from "../../../hooks/useNotification";

interface DeleteSystemProps {
  system: { id: number; name: string }
  openDeleteModal: boolean;
  setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSystems: (systems: SystemType[] | ((prev: SystemType[]) => SystemType[])) => void
}

function DeleteSystem(props: DeleteSystemProps) {
  const { openDeleteModal, system, setOpenDeleteModal, setSystems } = props;
  const [loadingDelete, setLoadingDelete] = useState(false);

  const notification = useNotification();

  const onSubmit = async () => {
    setLoadingDelete(true);
    try {
      await deleteSystem(system.id);
      setSystems((prev) => prev.filter(item => item.id !== system.id) )
      setOpenDeleteModal(false);
      notification.success('Xóa Hệ thống thành công')
    } catch (err) {
      console.log(err);
      notification.error('Xóa Hệ thống thất bại')
    } finally {
      setLoadingDelete(false);
    }
  }
  return (
    <Modal
      open={openDeleteModal}
      className='!p-0'
      onCancel={() => setOpenDeleteModal(false)}
      footer={false}
    >
      <div className="w-full text-center p-3 h-[60px] leading-[36px] bg-[#0071BA] rounded-t-lg uppercase font-bold">Xóa hệ thống</div>
      <h2 className="p-4 text-xl text-black text-center">Bạn có muốn xóa <span className="font-bold">{system.name}</span> không?</h2>
      <div className="flex justify-center gap-12 p-4">
        <Button type="primary" danger onClick={() => setOpenDeleteModal(false)}>Hủy</Button>
        <Button type="primary" color="info" onClick={onSubmit} loading={loadingDelete}>Xác nhận</Button>
      </div>
    </Modal>
  )
}

export default DeleteSystem;