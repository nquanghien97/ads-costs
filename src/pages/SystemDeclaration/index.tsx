import React, { useState } from 'react'
import { Button, Tooltip } from 'antd'
import PlusIcon from '../../assets/icons/PlusIcon'
import SystemItem from './SystemItem'
import AddNewSystem from './AddNewSystem'

const systemData = [
  {
    id: 1,
    name: 'Hệ thống 1'
  },
  {
    id: 2,
    name: 'Hệ thống 2'
  },
  {
    id: 3,
    name: 'Hệ thống 3'
  },
  {
    id: 4,
    name: 'Hệ thống 4'
  },
  {
    id: 5,
    name: 'Hệ thống 1'
  },
  {
    id: 6,
    name: 'Hệ thống 2'
  },
  {
    id: 7,
    name: 'Hệ thống 3'
  },
  {
    id: 8,
    name: 'Hệ thống 4'
  }
]

export default function SystemDeclaration() {
  const [openAddSystemModal, setOpenAddSystemModal] = useState(false);
  return (
    <>
      <ul className="flex flex-wrap gap-4 px-4 py-6 text-white cursor-pointer">
        {systemData.map((system) => (
          <React.Fragment key={system.id}>
            <SystemItem system={system.name} system_id={system.id} />
          </React.Fragment>
        ))}
        <div className="w-[200px] h-[140px] bg-[#0071BA] rounded-xl flex flex-col gap-2 items-center justify-center">
          <Tooltip title="Thêm hệ thống">
            <Button
              onClick={() => setOpenAddSystemModal(true)}
              type="default"
              shape="circle"
              className="bg-white focus:outline-none"
              icon={<PlusIcon color="#0071BA" />}
            />
          </Tooltip>
          Thêm hệ thống
        </div>
      </ul>
      <AddNewSystem open={openAddSystemModal} onOk={() => console.log('ok')} onCancel={() => setOpenAddSystemModal(false)} />
    </>
  )
}
