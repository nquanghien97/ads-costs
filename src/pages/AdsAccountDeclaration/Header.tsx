import SearchIcon from "../../assets/icons/SearchIcon";
import { useState } from "react";
import { Button, DatePicker, Form, Input, Select, Tooltip } from "antd";
import User from "../../entities/User";
import { useGroupsStore } from "../../zustand/groups.store";
import { useSystemsStore } from "../../zustand/systems.store";
import { getUsers } from "../../services/users";
import { getListAdsAccount } from "../../services/ads_account";
import { AdsAccountType } from "../../entities/AdsAccount";
import localeValues from "antd/locale/vi_VN";

interface FormValues {
  search: string;
  system_id: number;
  group_id: number;
  search_name: {
    label: string;
    value: number;
  };
  channel_id: number;
}

interface HeaderProps {
  setData: React.Dispatch<React.SetStateAction<AdsAccountType[]>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

function Header(props: HeaderProps) {
  const { setData, setLoading } = props;

  const { RangePicker } = DatePicker;
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

  const onFinish = async (data: FormValues) => {
    setLoading(true);
    try {
      const res = await getListAdsAccount({
        search: data.search,
        system_id: data.system_id,
        group_id: data.group_id,
        name: data.search_name?.label,
        channel_id: data.channel_id
      });
      setData(res.data.data.list)
      console.log(data)
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false)
    }
  }

  return (
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
          name="system_id"
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
          name="group_id"
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
          name="search_name"
        >
          <Select
            labelInValue
            options={name.map(item => ({label: item.name, value: item.id}))}
            className="z-50 h-full w-[160px]"
            placeholder="Họ tên"
          />
        </Form.Item>
        <Form.Item
          className="w-[160px]"
          name="channel_id"
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
          locale={localeValues.DatePicker}
          className="h-[40px]"
        />
      </Form.Item>
    </Form>
  )
}

export default Header;

