import SearchIcon from "../../assets/icons/SearchIcon";
import BaseButton from "../../components/common/BaseButton";
import { Button, DatePicker, Form, Input, Select, Tooltip } from "antd";
import { dataSystem } from "../../data/systems";
import { dataGroups } from "../../data/groups";
import { useState } from "react";

function HeaderInvoice() {

  const { RangePicker } = DatePicker
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
    <div className="fixed bg-[#f0f0f0] right-0 left-[160px] z-[99] px-4 shadow-[0_12px_12px_-15px_rgba(0,0,0,0.3)]">
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
          <Form.Item
            className="w-[160px]"
            name="channel"
          >
            <Select
              // options={options}
              // onChange={handleChange}
              className="z-50 h-full w-[160px]"
              placeholder="Kênh chạy"
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
        <Form.Item
          name="date"
        >
          <RangePicker 
            className="h-[40px]"
          />
        </Form.Item>
      </Form>
      <div className="flex py-2 justify-between">
        <BaseButton color="info" className="text-white">Khai báo CPQC - Hóa đơn</BaseButton>
        <div className="flex gap-2">
          <BaseButton className="bg-white">Export dữ liệu</BaseButton>
        </div>
      </div>
    </div>
  )
}

export default HeaderInvoice;