import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom"
import GroupItem from "./GroupItem";
import { Button, Tooltip } from "antd";
import PlusIcon from "../../assets/icons/PlusIcon";
import AddNewGroup from "./AddNewGroup";
import withAuth from "../../hocs/withAuth";

const groupData = [
  {
    id: 1,
    name: 'Hộ kinh doanh 1'
  },
  {
    id: 2,
    name: 'Hộ kinh doanh 2'
  },
  {
    id: 3,
    name: 'Hộ kinh doanh 3'
  },
  {
    id: 4,
    name: 'Hộ kinh doanh 4'
  },
  {
    id: 5,
    name: 'Hộ kinh doanh 1'
  },
  {
    id: 6,
    name: 'Hộ kinh doanh 2'
  },
  {
    id: 7,
    name: 'Hộ kinh doanh 3'
  },
  {
    id: 8,
    name: 'Hộ kinh doanh 4'
  }
]

function GroupDeclaration() {
  const params = useParams()
  console.log(params.systemId)
  const [openAddGroupModal, setOpenAddGroupModal] = useState(false);
  return (
    <>
      <ul className="flex flex-wrap gap-4 px-4 py-6 text-white cursor-pointer">
        {groupData.map((group) => (
          <React.Fragment key={group.id}>
            <GroupItem group={group.name} group_id={group.id} />
          </React.Fragment>
        ))}
        <div className="w-[200px] h-[140px] bg-[#0071BA] rounded-xl flex gap-2 items-center justify-center p-4">
          <span>Thêm hộ kinh doanh</span>
          <Tooltip title="Thêm hệ thống">
            <Button
              onClick={() => setOpenAddGroupModal(true)}
              type="default"
              shape="circle"
              className="bg-white focus:outline-none"
              icon={<PlusIcon color="#0071BA" />}
            />
          </Tooltip>
        </div>
      </ul>
      <AddNewGroup open={openAddGroupModal} onOk={() => console.log('ok')} onCancel={() => setOpenAddGroupModal(false)} />
    </>
  )
}

const GroupDeclarationWithAuth = withAuth(GroupDeclaration);

export default GroupDeclarationWithAuth;
