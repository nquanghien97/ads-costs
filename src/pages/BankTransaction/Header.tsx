import { useState } from "react";
import SearchIcon from "../../assets/icons/SearchIcon";
import { Button, DatePicker, Form, Input, Select, Tooltip } from "antd";
import User from "../../entities/User";
import { useGroupsStore } from "../../zustand/groups.store";
import { useSystemsStore } from "../../zustand/systems.store";
import { getUsers } from "../../services/users";
import localeValues from "antd/locale/vi_VN";
import TransferMoney from "./Declaration/transfer-money";
import CostsDeclaration from "./Declaration/costs";
import ExchangeRate from "./Declaration/exchange_rate";

interface FormValues {
  search: string;
  system_id: number;
  group_id: number;
  search_name: {
    label: string;
    value: number;
  };
}

function HeaderInvoice() {

  const { RangePicker } = DatePicker
  const { groups } = useGroupsStore();
  const { systems } = useSystemsStore();
  const [selectedSystem, setSelectedSystem] = useState(-1);
  const [name, setName] = useState<User[]>([]);

  const [form] = Form.useForm();

  const handleSystemChange = (option: number) => {
    setSelectedSystem(option)
    form.setFieldsValue({ group_id: null });
    form.setFieldsValue({ search_name: null });
  };

  const handleGroupChange = async (value: number) => {
    form.setFieldsValue({ name: null })
    try {
      const res = await getUsers({group_id: value});
      setName(res.data.data.list)
    } catch(e){
      console.log(e);
    }
  }

  const onFinish = (data: FormValues) => {
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
              options={systems.map((system) => ({ label: system.name, value: system.id }))}
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
              options={groups.filter((id) => id.system_id === selectedSystem).map((group) => ({ label: group.name, value: group.id }))}
              onChange={handleGroupChange}
              className="z-50 h-full w-[160px]"
              placeholder="HKD"
            />
          </Form.Item>
          <Form.Item
            className="w-[160px]"
            name="name"
          >
            <Select
              options={name.map(item => ({label: item.name, value: item.id}))}
              className="z-50 h-full w-[160px]"
              placeholder="Họ tên"
              notFoundContent="Loading..."
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
            locale={localeValues.DatePicker}
            className="h-[40px]"
          />
        </Form.Item>
      </Form>
      <div className="flex py-2 justify-between">
        <div className="flex gap-2">
          <TransferMoney />
          <CostsDeclaration />
          <ExchangeRate />
        </div>
        <div className="flex gap-2">
          <div className="bg-[#0071ba] rounded-md cursor-pointer h-full px-4 py-3 flex items-center justify-center hover:opacity-80 duration-300">
            <span className="text-white">Khai báo Chi phí</span>
          </div>
          <div className="bg-[#0071ba] rounded-md cursor-pointer h-full px-4 py-3 flex items-center justify-center hover:opacity-80 duration-300">
            <span className="text-white">Export dữ liệu</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default HeaderInvoice;