import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom"
import GroupItem from "./GroupItem";
import { Alert, Button, Skeleton, Tooltip } from "antd";
import PlusIcon from "../../assets/icons/PlusIcon";
import AddNewGroup from "./AddNewGroup";
import withAuth from "../../hocs/withAuth";
import GroupType from "../../entities/Group";
import { getGroupsBySystemId } from "../../services/groups";

function GroupDeclaration() {
  const params = useParams();
  const location = useLocation();
  const [groups, setGroups] = useState<GroupType[]>([]);
  const [loading, setLoading] = useState(false);
  const [openAddGroupModal, setOpenAddGroupModal] = useState(false);

  const systemId = params.systemId || '0'

  const fetchGroups = useCallback( async () => {
    setLoading(true);
    try {
      const res = await getGroupsBySystemId(+systemId)
      setGroups(res.data.data.list)
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [systemId])

  useEffect(() => {
    fetchGroups()
  }, [fetchGroups])

  return (
    <>
      <div className="pt-4 mx-4">
        <Alert message={location.state?.system.name} type="info" />
      </div>
      <ul className="flex flex-wrap gap-4 px-4 py-6 text-white cursor-pointer">
        {loading ? (
          <>
            <Skeleton.Button className='!w-[200px] !h-[140px]' active />
            <Skeleton.Button className='!w-[200px] !h-[140px]' active />
            <Skeleton.Button className='!w-[200px] !h-[140px]' active />
         </>
        ) : (
          groups.map((group) => (
            <React.Fragment key={group.id}>
              <GroupItem group={group} setGroups={setGroups} />
            </React.Fragment>
          ))
        )}
        <div className="w-[200px] h-[140px] bg-[#0071BA] rounded-xl flex gap-2 items-center justify-center p-4" onClick={() => setOpenAddGroupModal(true)}>
          <span>Thêm hộ kinh doanh</span>
          <Tooltip title="Thêm hệ thống">
            <Button
              type="default"
              shape="circle"
              className="bg-white focus:outline-none"
              icon={<PlusIcon color="#0071BA" />}
            />
          </Tooltip>
        </div>
      </ul>
      <AddNewGroup open={openAddGroupModal} setGroups={setGroups} onCancel={() => setOpenAddGroupModal(false)} system_id={+systemId} />
    </>
  )
}

const GroupDeclarationWithAuth = withAuth(GroupDeclaration);

export default GroupDeclarationWithAuth;
