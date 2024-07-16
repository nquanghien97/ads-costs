import { Button, Tooltip } from 'antd';
import EditIcon from '../../../assets/icons/EditIcon';
import { useState } from 'react';
import EditGroup from './EditGroup';
import { useNavigate } from 'react-router-dom';

interface GroupItemProps {
  group: string;
  group_id: number;
}

export default function GroupItem(props: GroupItemProps) {

  const { group, group_id} = props;
  const [openEditModal, setOpenEditModal] = useState(false);
  const navigate = useNavigate()

  return (
    <>
      <li className="w-[200px] h-[140px] bg-[#0071BA] rounded-xl flex items-center justify-center p-4" onClick={() => {navigate(`/khai-bao-ho-kinh-doanh/${group_id}`)}}>
        <span className="mr-2">{group}</span>
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
      <EditGroup open={openEditModal} onOk={() => console.log(group_id)} onCancel={() => setOpenEditModal(false)} />
    </>
  )
}
