import { Button, Modal } from 'antd'
import { useState } from 'react';
import { blockUser } from '../../../services/users';
import { useNotification } from '../../../hooks/useNotification';

interface BlockUserProps {
  open: boolean;
  onCancel: () => void;
  dataBlock: {
    user_id: number;
    username: string
  };
  setRefreshKey: React.Dispatch<React.SetStateAction<boolean>>
}

function BlockUser(props: BlockUserProps) {
  const { open, onCancel, dataBlock, setRefreshKey } = props
  const [loading, setLoading] = useState(false);

  const notification = useNotification();

  const onSubmit = async () => {
    setLoading(true)
    try {
      await blockUser(dataBlock.user_id)
      notification.success('Khóa người dùng thành công')
      setRefreshKey(pre => !pre)
      onCancel()
    } catch (err) {
      console.log(err)
      notification.error('Khóa người dùng không thành công')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
        open={open}
        className='!p-0 !w-1/2'
        onCancel={onCancel}
        footer={false}
      >
        <div className="w-full text-center p-3 h-[60px] leading-[36px] bg-[#0071BA] rounded-t-lg uppercase font-bold">{`Bạn muốn khóa tài khoản ${dataBlock.username}`}</div>
        <div className="flex justify-center gap-12 p-4">
          <Button type="primary" danger onClick={onCancel}>Hủy</Button>
          <Button type="primary" onClick={onSubmit} loading={loading}>Xác nhận</Button>
        </div>
      </Modal>
  )
}

export default BlockUser