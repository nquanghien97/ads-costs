import { Button, Modal } from 'antd'
import { useState } from 'react';
import { unBlockUser } from '../../../services/users';
import { useNotification } from '../../../hooks/useNotification';

interface UnBlockUserProps {
  open: boolean;
  onCancel: () => void;
  dataUnBlock: {
    user_id: number;
    username: string;
  };
  setRefreshKey: React.Dispatch<React.SetStateAction<boolean>>
}

function UnBlockUser(props: UnBlockUserProps) {
  const { open, onCancel, dataUnBlock, setRefreshKey } = props
  const [loading, setLoading] = useState(false);

  const notification = useNotification()

  const onSubmit = async () => {
    setLoading(true)
    try {
      await unBlockUser(dataUnBlock.user_id)
      notification.success('Mở khóa người dùng thành công')
      setRefreshKey(pre => !pre)
      onCancel()
    } catch (err) {
      console.log(err)
      notification.error('Mở khóa người dùng không thành công')
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
        <div className="w-full text-center p-3 h-[60px] leading-[36px] bg-[#0071BA] rounded-t-lg uppercase font-bold">{`Bạn muốn mở khóa tài khoản ${dataUnBlock.username}`}</div>
        <div className="flex justify-center gap-12 p-4">
          <Button type="primary" danger onClick={onCancel}>Hủy</Button>
          <Button type="primary" onClick={onSubmit} loading={loading}>Xác nhận</Button>
        </div>
      </Modal>
  )
}

export default UnBlockUser