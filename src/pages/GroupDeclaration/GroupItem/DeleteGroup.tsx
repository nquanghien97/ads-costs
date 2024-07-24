import { Button, Modal } from "antd";
import { deleteGroup } from "../../../services/groups";
import { useState } from "react";
import GroupType from "../../../entities/Group";
import { useNotification } from "../../../hooks/useNotification";

interface DeleteGroupProps {
  group: { id: number; name: string }
  openDeleteModal: boolean;
  setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setGroups: (group: GroupType[] | ((prev: GroupType[]) => GroupType[])) => void
}

function DeleteGroup(props: DeleteGroupProps) {
  const { openDeleteModal, group, setOpenDeleteModal, setGroups } = props;
  const [loadingDelete, setLoadingDelete] = useState(false);

  const notification = useNotification();

  const onSubmit = async () => {
    setLoadingDelete(true);
    try {
      await deleteGroup(group.id);
      setGroups((prev) => prev.filter(item => item.id !== group.id) )
      setOpenDeleteModal(false);
      notification.success('Xóa Hộ kinh doanh thành công')
    } catch (err) {
      console.log(err);
      notification.error('Xóa Hộ kinh doanh thất bại')
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
      <h2 className="p-4 text-xl text-black text-center">Bạn có muốn xóa <span className="font-bold">{group.name}</span> không?</h2>
      <div className="flex justify-center gap-12 p-4">
        <Button type="primary" danger onClick={() => setOpenDeleteModal(false)}>Hủy</Button>
        <Button type="primary" color="info" onClick={onSubmit} loading={loadingDelete}>Xác nhận</Button>
      </div>
    </Modal>
  )
}

export default DeleteGroup;