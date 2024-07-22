import React, { useEffect, useState } from 'react'
import { Button, Skeleton, Tooltip } from 'antd'
import PlusIcon from '../../assets/icons/PlusIcon'
import SystemItem from './SystemItem'
import AddNewSystem from './AddNewSystem'
import withAuth from '../../hocs/withAuth'
import { useSystemsStore } from '../../zustand/systems.store'

function SystemDeclaration() {
  const [openAddSystemModal, setOpenAddSystemModal] = useState(false);
  
  const { systems, loading, setSystems } = useSystemsStore()

  useEffect(() => {
    document.title = "Khai báo hộ kinh doanh"
  }, []);

  return (
    <>
      <ul className="flex flex-wrap gap-4 px-4 py-6 text-white cursor-pointer">
        {loading ? (
          <>
            <Skeleton.Button className='!w-[200px] !h-[140px]' active />
            <Skeleton.Button className='!w-[200px] !h-[140px]' active />
            <Skeleton.Button className='!w-[200px] !h-[140px]' active />
          </>
        ) : (
          systems.map((system) => (
            <React.Fragment key={system.id}>
              <SystemItem system={system} setSystems={setSystems} />
            </React.Fragment>
          ))
        )
        }
        <div
          className="w-[200px] h-[140px] bg-[#0071BA] rounded-xl flex flex-col gap-2 items-center justify-center"
          onClick={() => setOpenAddSystemModal(true)}
        >
          <Tooltip title="Thêm hệ thống">
            <Button
              type="default"
              shape="circle"
              className="bg-white focus:outline-none"
              icon={<PlusIcon color="#0071BA" />}
            />
          </Tooltip>
          Thêm hệ thống
        </div>
      </ul>
      <AddNewSystem open={openAddSystemModal} onCancel={() => setOpenAddSystemModal(false)} setSystems={setSystems} />
    </>
  )
}

const SystemDeclarationWithAuth = withAuth(SystemDeclaration);

export default SystemDeclarationWithAuth;
