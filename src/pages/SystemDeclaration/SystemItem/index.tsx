import { Button, Tooltip } from 'antd';
import EditIcon from '../../../assets/icons/EditIcon';
import { useState } from 'react';
import EditSystem from './EditSystem';
import { useNavigate } from 'react-router-dom';

interface SystemItemProps {
  system: string;
  system_id: number;
}

export default function SystemItem(props: SystemItemProps) {

  const { system, system_id} = props;
  const [openEditModal, setOpenEditModal] = useState(false);
  const navigate = useNavigate()

  return (
    <>
      <li className="w-[200px] h-[140px] bg-[#0071BA] rounded-xl flex items-center justify-center" onClick={() => {navigate(`/khai-bao-ho-kinh-doanh/${system_id}`)}}>
        <span className="mr-2">{system}</span>
        <Tooltip title="Chỉnh sửa" >
          <Button
            onClick={(e) => {
              setOpenEditModal(true);
              e.stopPropagation();
            }}
            className='focus:outline-none'
            type="primary"
            shape="circle"
            icon={<EditIcon color='white' width={24} height={24} />}
          />
        </Tooltip>
      </li>
      <EditSystem open={openEditModal} onOk={() => console.log(system_id)} onCancel={() => setOpenEditModal(false)} />
    </>
  )
}
