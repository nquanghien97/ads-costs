import { Button, Tooltip } from 'antd';
import EditIcon from '../../../assets/icons/EditIcon';
import { useState } from 'react';
import EditGroup from './EditGroup';
import GroupType from '../../../entities/Group';
import MinusIcon from '../../../assets/icons/MinusIcon';
import DeleteGroup from './DeleteGroup';

interface GroupItemProps {
  group: {
    id: number;
    name: string;
  };
  setGroups: React.Dispatch<React.SetStateAction<GroupType[]>>
}

export default function GroupItem(props: GroupItemProps) {

  const { group, setGroups } = props;
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  return (
    <>
      <li className="w-[200px] h-[140px] bg-[#0071BA] rounded-xl flex items-center justify-center p-4">
        <span className="mr-2">{group.name}</span>
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
      {openEditModal && <EditGroup open={openEditModal} group={group} onCancel={() => setOpenEditModal(false)} setGroupps={setGroups} />}
      {openDeleteModal && <DeleteGroup openDeleteModal={openDeleteModal} setOpenDeleteModal={setOpenDeleteModal} setGroups={setGroups} group={group} />}
    </>
  )
}
