import SearchIcon from "../../assets/icons/SearchIcon";
import { useState } from "react";
import BaseButton from "../../components/common/BaseButton";
import PlusIcon from "../../assets/icons/PlusIcon";
import AddNewUser from "./AddNewUser";
import { Button, Form, Input, Select, Tooltip } from "antd";
import { dataSystem } from "../../data/systems";
import { dataGroups } from "../../data/groups";

function Header() {
  const [openAddNewAdsAccount, setOpenAddNewAdsAccount] = useState(false)
  const [valueSystem, setValueSystem] = useState<string | null>()
  const [valueGroup, setValueGroup] = useState<string | null>()

  const handleSystemChange = (option: string) => {
    setValueSystem(option)
    setValueGroup(null)
  }
  const handleGroupChange = (option: string) => {
    setValueGroup(option)
  }

  const onFinish = (data: unknown) => {
    console.log(data)
  }
  return (
    <>
      <Form onFinish={onFinish} className="flex py-2 justify-between">
        <div className="flex gap-2 items-center">
          <Form.Item
            className="w-[160px]"
            name="key_word"
          >
            <Input
              placeholder="Tìm kiếm"
              className="py-2"
            />
          </Form.Item>
          <Form.Item
            className="w-[160px]"
            name="system"
          >
            <Select
              options={dataSystem.map((system) => ({ label: system.name, value: system.id}))}
              onChange={handleSystemChange}
              className="z-50 h-full w-[160px]"
              placeholder="Hệ thống"
            />
          </Form.Item>
          <Form.Item
            className="w-[160px]"
            name="group"
          >
            <Select
              options={dataGroups.filter((id) => id.system_id === valueSystem).map((group) => ({ label: group.name, value: group.id }))}
              onChange={handleGroupChange}
              value={valueGroup}
              className="z-50 h-full w-[160px]"
              placeholder="HKD"
            />
          </Form.Item>
          <Form.Item
            className="w-[160px]"
            name="name"
          >
            <Select
              // options={options}
              // onChange={handleChange}
              className="z-50 h-full w-[160px]"
              placeholder="Họ tên"
            />
          </Form.Item>
          <Form.Item>
            <Tooltip title="Tìm kiếm">
              <Button
                htmlType="submit"
                type="primary"
                shape="circle"
                icon={<SearchIcon color="white" />}
              />
            </Tooltip>
          </Form.Item>
        </div>
      </Form>
      <div className="flex my-4">
        <div className="m-auto">
          <span className="px-6 py-2 rounded-full bg-[#0071BA] text-white uppercase">Quản lý người dùng</span>
        </div>
        <BaseButton color="info" className="text-white" onClick={() => setOpenAddNewAdsAccount(true)}>
          Thêm mới
          <PlusIcon color="white" />
        </BaseButton>
      </div>
      {openAddNewAdsAccount && <AddNewUser onClose={() => setOpenAddNewAdsAccount(false)} />}
    </>
  )
}

export default Header;
