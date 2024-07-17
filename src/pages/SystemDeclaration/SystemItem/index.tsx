import { Button, Tooltip } from 'antd';
import EditIcon from '../../../assets/icons/EditIcon';
import { useState } from 'react';
import EditSystem from './EditSystem';
import { useNavigate } from 'react-router-dom';
import SystemType from '../../../entities/System';
import MinusIcon from '../../../assets/icons/MinusIcon';
import DeleteSystem from './DeleteSystem';

interface SystemItemProps {
  system: {
    id: number;
    name: string;
  };
  setSystems: (systems: SystemType[] | ((prev: SystemType[]) => SystemType[])) => void
}

export default function SystemItem(props: SystemItemProps) {

  const { system, setSystems } = props;
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const navigate = useNavigate()

  return (
    <>
      <li className="w-[200px] h-[140px] bg-[#0071BA] rounded-xl flex items-center justify-center" onClick={() => {navigate(`/khai-bao-ho-kinh-doanh/${system.id}`)}}>
        <span className="mr-2">{system.name}</span>
        <div className="flex flex-col gap-4">
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
          <Tooltip title="Xóa HKD">
            <Button
              className="focus:outline-none"
              type='primary'
              danger
              onClick={(e) => {
                setOpenDeleteModal(true);
                e.stopPropagation();
              }}
              shape='circle'
              icon={<MinusIcon color="white" width={16} />}
            />
          </Tooltip>
        </div>
      </li>
      {openEditModal && <EditSystem open={openEditModal} system={system} onCancel={() => setOpenEditModal(false)} setSystems={setSystems} />}
      {openDeleteModal && <DeleteSystem setSystems={setSystems} setOpenDeleteModal={setOpenDeleteModal} openDeleteModal={openDeleteModal} system={system} />}
    </>
  )
}
