import { Button, Modal } from 'antd'

interface EditGroupProps {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
}

export default function EditGroup(props: EditGroupProps) {
  const { open, onOk, onCancel } = props
  return (
    <Modal
      open={open}
      className='!p-0'
      onCancel={onCancel}
      footer={
        <div className="flex justify-evenly py-4">
          <Button danger type='primary' className='focus:outline-none' onClick={onCancel}>Hủy</Button>
          <Button type="primary" className='focus:outline-none' onClick={onOk}>Xác nhận</Button>
        </div>
      }
    >
      <div className="w-full text-center p-3 h-[60px] leading-[36px] bg-[#0071BA] rounded-t-lg uppercase font-bold">Chỉnh sửa hệ thống</div>
      <div className="p-4">
        edit
      </div>
    </Modal>
  )
}
