import { Button, Modal } from 'antd';
import { useState } from 'react'
import { deleteBankAccount } from '../../../services/bank_account';

interface DeleteBankAccountProps {
  openDeleteModal: boolean;
  onClose: () => void;
  bankId: number;
  setRefreshKey: React.Dispatch<React.SetStateAction<boolean>>
}

function DeleteBankAccount(props: DeleteBankAccountProps) {
  const { openDeleteModal, bankId, onClose, setRefreshKey } = props
  const [loadingDelete, setLoadingDelete] = useState(false);

  const onSubmit = async () => {
    setLoadingDelete(true);
    try {
      await deleteBankAccount(bankId);
      onClose()
      setRefreshKey(pre => !pre)
    } catch (err) {
      console.log(err)
    } finally {
      setLoadingDelete(false)
    }
  }

  return (
    <Modal
      open={openDeleteModal}
      className='!p-0'
      onCancel={onClose}
      footer={false}
    >
      <div className="w-full text-center p-3 h-[60px] leading-[36px] bg-[#0071BA] rounded-t-lg uppercase font-bold">Xóa tài khoản ngân hàng</div>
      <h2 className="p-4 text-xl text-black text-center">Bạn có muốn xóa tài khoản ngân hàng này không?</h2>
      <div className="flex justify-center gap-12 p-4">
        <Button type="primary" danger onClick={onClose}>Hủy</Button>
        <Button type="primary" color="info" onClick={onSubmit} loading={loadingDelete}>Xác nhận</Button>
      </div>
    </Modal>
  )
}

export default DeleteBankAccount