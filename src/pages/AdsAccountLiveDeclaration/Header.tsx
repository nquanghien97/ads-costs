import SearchIcon from "../../assets/icons/SearchIcon";
import { useState } from "react";
import { Button, DatePicker, Form, Input, Select, Tooltip } from "antd";
import User from "../../entities/User";
import { useGroupsStore } from "../../zustand/groups.store";
import { useSystemsStore } from "../../zustand/systems.store";
import { getUsers } from "../../services/users";
import localeValues from "antd/locale/vi_VN";
import { formatDate } from "../../utils/date";
import { useInformationSettingsStore } from "../../zustand/information_settings.store";
import { SubmitFormSearchType } from ".";

interface FormValues {
  search: string;
  system_id: number;
  group_id: number;
  user: {
    label: string;
    value: number;
  };
  channel_id: number;
  date: Date[]
}

interface HeaderProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  setSubmitFormSearch: React.Dispatch<React.SetStateAction<SubmitFormSearchType>>
}

function Header(props: HeaderProps) {
  const { setLoading, setSubmitFormSearch } = props;

  const { RangePicker } = DatePicker;
  const { groups } = useGroupsStore();
  const { systems } = useSystemsStore();
  const { channels } = useInformationSettingsStore();
  const [selectedSystem, setSelectedSystem] = useState(-1);
  const [name, setName] = useState<User[]>([]);
  const [loadingUser, setLoadingUser] = useState(false);

  const [form] = Form.useForm();

  const handleSystemChange = (option: number) => {
    setSelectedSystem(option)
    form.setFieldsValue({ group_id: null });
    form.setFieldsValue({ user: null });
  };

  const handleGroupChange = async (value: number) => {
    setLoadingUser(true);
    form.setFieldsValue({ name: null })
    try {
      const res = await getUsers({group_id: value});
      setName(res.data.data.list)
    } catch(e){
      console.log(e);
    } finally {
      setLoadingUser(false);
    }
  }

  const onFinish = async (data: FormValues) => {
    setLoading(true);
    const submitData = {
      search: data.search,
      system_id: data.system_id,
      group_id: data.group_id,
      user_id: data.user?.value,
      channel_id: data.channel_id,
      since: data.date ? formatDate(new Date(data.date?.[0])): undefined,
      until: data.date ? formatDate(new Date(data.date?.[1])) : undefined,
    }
    try {
      setSubmitFormSearch((pre) => ({
        ...pre,
        ...submitData
      }));
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
            rootClassName="border-[1px] border-[#007bb5] rounded-lg"
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
            allowClear
            notFoundContent="Không có hệ thống"
            rootClassName="border-[1px] border-[#007bb5] rounded-lg"
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
            allowClear
            notFoundContent="Không có HKD"
            rootClassName="border-[1px] border-[#007bb5] rounded-lg"
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
            loading={loadingUser}
            notFoundContent="Không có nhân sự"
            rootClassName="border-[1px] border-[#007bb5] rounded-lg"
          />
        </Form.Item>
        <Form.Item
          className="w-[160px]"
          name="channel_id"
        >
          <Select
            options={channels.map(item => ({label: item.name, value: item.id}))}
            className="z-50 h-full w-[160px]"
            placeholder="Kênh chạy"
            allowClear
            rootClassName="border-[1px] border-[#007bb5] rounded-lg"
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
          className="h-[40px] border-[1px] border-[#007bb5] rounded-lg"
        />
      </Form.Item>
    </Form>
  )
}

export default Header;

