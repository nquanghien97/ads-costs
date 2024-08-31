import { Button, Modal } from 'antd';
import { useState } from 'react'
import { deleteAdAccount } from '../../../services/ads_account';
import { useNotification } from '../../../hooks/useNotification';
import axios from 'axios';

interface DeleteAdAccountProps {
  openDeleteModal: boolean;
  onClose: () => void;
  account_id: number;
  setRefreshKey: React.Dispatch<React.SetStateAction<boolean>>
}

function DeleteAdAccount(props: DeleteAdAccountProps) {
  const { openDeleteModal, account_id, onClose, setRefreshKey } = props
  const [loadingDelete, setLoadingDelete] = useState(false);

  const notification = useNotification();

  const onSubmit = async () => {
    setLoadingDelete(true);
    try {
      await deleteAdAccount(account_id);
      notification.success('Xóa tài khoản quảng cáo thành công')
      onClose()
      setRefreshKey(pre => !pre)
    } catch (err) {
      if(axios.isAxiosError(err)) {
        notification.error(err.response?.data.message)
      }
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
      <div className="w-full text-center p-3 h-[60px] leading-[36px] bg-[#68c2ed] rounded-t-lg uppercase font-bold">Xóa chiến dịch</div>
      <h2 className="p-4 text-xl text-black text-center">Bạn có muốn xóa chiến dịch này không?</h2>
      <div className="flex justify-center gap-12 p-4">
        <Button type="primary" danger onClick={onClose}>Hủy</Button>
        <Button type="primary" color="info" onClick={onSubmit} loading={loadingDelete}>Xác nhận</Button>
      </div>
    </Modal>
  )
}

export default DeleteAdAccount