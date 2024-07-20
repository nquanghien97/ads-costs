import SearchIcon from "../../assets/icons/SearchIcon";
import { useState } from "react";
import { Button, Form, Input, Select, Tooltip } from "antd";
import { dataSystem } from "../../data/systems";
import { dataGroups } from "../../data/groups";
import { getUsers } from "../../services/users";

interface FormValues {
  key_word: string;
  system_id: number;
  group_id: number;
  name: string;
}

function Header() {
  const [valueSystem, setValueSystem] = useState<string | null>()
  const [valueGroup, setValueGroup] = useState<string | null>()

  const handleSystemChange = (option: string) => {
    setValueSystem(option)
    setValueGroup(null)
  }
  const handleGroupChange = (option: string) => {
    setValueGroup(option)
  }

  const onFinish = async (data: FormValues) => {
    if(data.key_word) {
      // await getUsers({ })
    } else {
      console.log(data)
    }
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
            name="system_id"
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
            name="group_id"
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
            name="search_name"
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
    </>
  )
}

export default Header;
