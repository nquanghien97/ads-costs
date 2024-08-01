import SearchIcon from "../../assets/icons/SearchIcon";
import { Button, DatePicker, Form, Input, Select, Tooltip } from "antd";
import { useState } from "react";
import { useGroupsStore } from "../../zustand/groups.store";
import { useSystemsStore } from "../../zustand/systems.store";
import User from "../../entities/User";
import { getUsers } from "../../services/users";
import localeValues from "antd/locale/vi_VN";
import { SearchForm } from ".";
import { formatDate } from "../../utils/date";

interface FormValues {
  search: string;
  system: {
    label: string;
    value: number;
  };
  group: {
    label: string;
    value: number;
  };
  user: {
    label: string;
    value: number;
  };
  date: Date[];
}

function Header({ setSearchForm } : { setSearchForm: React.Dispatch<React.SetStateAction<SearchForm>> }) {

  const { RangePicker } = DatePicker
  const { groups } = useGroupsStore();
  const { systems } = useSystemsStore();
  const [selectedSystem, setSelectedSystem] = useState(-1);
  const [name, setName] = useState<User[]>([]);

  const [form] = Form.useForm();

  const handleSystemChange = (option: { label: string, value: number}) => {
    setSelectedSystem(option.value)
    form.setFieldsValue({ group: null });
    form.setFieldsValue({ search: null });
  };

  const handleGroupChange = async (option: { label: string, value: number}) => {
    console.log(option)
    form.setFieldsValue({ name: null })
    try {
      const res = await getUsers({group_id: option.value});
      setName(res.data.data.list)
    } catch(e){
      console.log(e);
    }
  }
  const onFinish = (data: FormValues) => {
    const submitData = {
      search: data.search,
      system_id: data.system?.value,
      system_name: data.system?.label,
      group_id: data.group?.value,
      group_name: data.group?.label,
      user_id: data.user?.value,
      since: data.date ? formatDate(new Date(data.date?.[0])): undefined,
      until: data.date ? formatDate(new Date(data.date?.[1])) : undefined,
    }
    setSearchForm(submitData)
  }

  return (
    <div>
      <Form onFinish={onFinish} className="flex py-2 justify-between" form={form}>
        <div className="flex gap-2 items-center">
          <Form.Item
            className="w-[160px]"
            name="search"
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
              labelInValue
              options={systems.map((system) => ({ label: system.name, value: system.id }))}
              onChange={handleSystemChange}
              className="z-50 h-full w-[160px]"
              placeholder="Hệ thống"
              allowClear
            />
          </Form.Item>
          <Form.Item
            className="w-[160px]"
            name="group"
          >
            <Select
              labelInValue
              options={groups.filter((id) => id.system_id === selectedSystem).map((group) => ({ label: group.name, value: group.id }))}
              onChange={handleGroupChange}
              className="z-50 h-full w-[160px]"
              placeholder="HKD"
              allowClear
            />
          </Form.Item>
          <Form.Item
            className="w-[160px]"
            name="user"
          >
            <Select
              labelInValue
              options={name.map(item => ({label: item.name, value: item.id}))}
              className="z-50 h-full w-[160px]"
              placeholder="Họ tên"
              allowClear
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
      <div className='flex justify-center mb-4'>
        <div className="px-8 py-2 bg-[#0071ba] rounded-full text-white uppercase font-bold text-xl">
          <span>Báo cáo dữ liệu ADS</span>
        </div>
      </div>
    </div>
  )
}

export default Header;