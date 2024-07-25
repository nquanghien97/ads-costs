import SearchIcon from "../../assets/icons/SearchIcon";
import { Button, DatePicker, Form, Input, Select, Tooltip } from "antd";
import { useState } from "react";
import AdCosts from "./Declaration/AdCosts";
import { useGroupsStore } from "../../zustand/groups.store";
import { useSystemsStore } from "../../zustand/systems.store";
import User from "../../entities/User";
import { getUsers } from "../../services/users";
import { useInformationSettingsStore } from "../../zustand/information_settings.store";
import BillCosts from "./Declaration/BillCosts";
import { SystemData } from "../../dto/AdsBillingsDTO";
import { formatDate } from "../../utils/formatDate";
import { useNotification } from "../../hooks/useNotification";
import { GetAdsCostsByUser } from "../../services/ads_costs";
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
  date: Date[]
}

interface HeaderProps {
  setDatas: React.Dispatch<React.SetStateAction<SystemData[] | undefined>>,
  setRefreshKey: React.Dispatch<React.SetStateAction<boolean>>,
  handleSearchClick: () => Promise<void>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

function Header({ setDatas, setRefreshKey, handleSearchClick, setLoading }: HeaderProps) {

  const { RangePicker } = DatePicker
  const { groups } = useGroupsStore();
  const { systems } = useSystemsStore();
  const { channels } = useInformationSettingsStore();
  const [selectedSystem, setSelectedSystem] = useState(-1);
  const [name, setName] = useState<User[]>([]);

  const notification = useNotification();

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
    const submitData = {
      search: data.search,
      since: data.date ? formatDate(new Date(data.date?.[0])): undefined,
      until: data.date ? formatDate(new Date(data.date?.[1])) : undefined,
      system_id: data.system_id,
      group_id: data.group_id,
      channel_id: data.channel_id
    }
    try {
      const res = await GetAdsCostsByUser(submitData)
      setDatas(res.data.data.list)
      handleSearchClick()
    } catch(err) {
      console.log(err);
      notification.error('Có lỗi xảy ra, vui lòng thử lại')
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bg-[#f0f0f0] right-0 left-[160px] z-[99] px-4 shadow-[0_12px_12px_-15px_rgba(0,0,0,0.3)]">
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
              options={name.map(item => ({label: item.name, value: item.id}))}
              className="z-50 h-full w-[160px]"
              placeholder="Họ tên"
              notFoundContent="Loading..."
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
        <div className="flex gap-4">
          <AdCosts />
          <BillCosts setRefreshKey={setRefreshKey} />
        </div>
        <div className="flex gap-2">
          <Button size="large" className="bg-white">Export dữ liệu</Button>
        </div>
      </div>
    </div>
  )
}

export default Header;