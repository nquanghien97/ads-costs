import SearchIcon from "../../assets/icons/SearchIcon";
import { Button, DatePicker, Form, Input, Select, Tooltip } from "antd";
import { useState } from "react";
import { useGroupsStore } from "../../zustand/groups.store";
import { useSystemsStore } from "../../zustand/systems.store";
import User from "../../entities/User";
import { getUsers } from "../../services/users";
import { useInformationSettingsStore } from "../../zustand/information_settings.store";
import { UserData } from "../../dto/AdsBillingsDTO";
import { formatDate } from "../../utils/date";
import localeValues from "antd/locale/vi_VN";
import { exportToExcel } from '../../components/ExportExcel/ExportExcelAdsCost'
import dayjs from "dayjs";
import { SearchFormValues } from ".";
interface FormValues {
  search: string;
  system_id: number;
  group_id: number;
  user: {
    label: string;
    value: number;
  };
  channel_id: number;
  date: Date[];
  status: string;
}

interface HeaderProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  dataExportExcel: UserData[] | undefined
  showAdCosts: boolean
  setShowAdCosts: React.Dispatch<React.SetStateAction<boolean>>
  showBillCosts: boolean
  setShowBillCosts: React.Dispatch<React.SetStateAction<boolean>>
  setSearchForm: React.Dispatch<React.SetStateAction<SearchFormValues>>
}

function Header({ setLoading, dataExportExcel, setShowAdCosts, setShowBillCosts, showAdCosts, showBillCosts, setSearchForm }: HeaderProps) {

  const { RangePicker } = DatePicker
  const { groups } = useGroupsStore();
  const { systems } = useSystemsStore();
  const { channels } = useInformationSettingsStore();
  const [selectedSystem, setSelectedSystem] = useState(-1);
  const [name, setName] = useState<User[]>([])
  const [loadingUser, setLoadingUser] = useState(false);

  const defaultDate = dayjs().subtract(1, 'day').startOf('day')

  const [form] = Form.useForm();

  const handleSystemChange = (option: number) => {
    setSelectedSystem(option)
    form.setFieldsValue({ group_id: null });
    form.setFieldsValue({ search_name: null });
  };

  const handleGroupChange = async (value: number) => {
    setLoadingUser(true);
    form.setFieldsValue({ name: null })
    try {
      const res = await getUsers({ group_id: value });
      setName(res.data.data.list)
    } catch (e) {
      console.log(e);
    } finally {
      setLoadingUser(false)
    }
  }

  const onFinish = async (data: FormValues) => {
    setLoading(true);
    const submitData = {
      search: data.search,
      since: data.date ? formatDate(new Date(data.date?.[0])) : undefined,
      until: data.date ? formatDate(new Date(data.date?.[1])) : undefined,
      system_id: data.system_id,
      group_id: data.group_id,
      channel_id: data.channel_id,
      user_id: data.user?.value,
      status: data.status
    }
    setSearchForm(submitData)
  }

  return (
    <div className="fixed bg-[#f0f0f0] right-0 left-[180px] z-[99] px-4 shadow-[0_12px_12px_-15px_rgba(0,0,0,0.3)]">
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
              options={name.map(item => ({ label: item.name, value: item.id }))}
              className="z-50 h-full w-[160px]"
              placeholder="Họ tên"
              notFoundContent="Không có nhân sự"
              allowClear
              loading={loadingUser}
              rootClassName="border-[1px] border-[#007bb5] rounded-lg"
            />
          </Form.Item>
          <Form.Item
            className="w-[160px]"
            name="channel_id"
          >
            <Select
              options={channels.map(item => ({ label: item.name, value: item.id }))}
              className="z-50 h-full w-[160px]"
              placeholder="Kênh chạy"
              allowClear
              rootClassName="border-[1px] border-[#007bb5] rounded-lg"
            />
          </Form.Item>
          <Form.Item
            className="w-[160px]"
            name="status"
          >
            <Select
              options={[{ label: "Đã XN", value: "Đã XN " }, { label: "Chưa XN", value: "Chưa XN " }, { label: "Sai số", value: "Sai số " }]}
              className="z-50 h-full w-[160px]"
              placeholder="Trạng thái số liệu"
              notFoundContent="Loading..."
              allowClear
              rootClassName="border-[1px] border-[#007bb5] rounded-lg"
            />
          </Form.Item>
          <Form.Item>
            <Tooltip title="Tìm kiếm">
              <Button
                htmlType="submit"
                // type="primary"
                shape="circle"
                className="bg-[#007bb5] hover:!bg-[#007bb5]"
                icon={<SearchIcon color="white" />}
              />
            </Tooltip>
          </Form.Item>
        </div>
        <Form.Item
          name="date"
          initialValue={[defaultDate, defaultDate]}
        >
          <RangePicker
            locale={localeValues.DatePicker}
            className="h-[40px] border-[1px] border-[#007bb5] rounded-lg"
            presets={[
              {label: 'Hôm nay', value: [dayjs().startOf('day'), dayjs().endOf('day')]},
              {label: 'Hôm qua', value: [dayjs().subtract(1, 'day').startOf('day'), dayjs().subtract(1, 'day').endOf('day')]},
              {label: 'Tháng này', value: [dayjs().startOf('month'), dayjs().endOf('month')]},
              {label: 'Tháng trước', value: [dayjs().subtract(1, 'month').startOf('month'), dayjs().subtract(1, 'month').endOf('month')]}
            ]}
          />
        </Form.Item>
      </Form>
      <div className="flex py-2 justify-between">
        <div className="flex gap-4">
          <div
            className={`${showAdCosts ? 'bg-[#68c2ed]' : 'text-black'} rounded-md cursor-pointer h-full px-4 flex items-center justify-center hover:opacity-80 duration-300`}
            onClick={() => {
              setShowAdCosts(true);
              setShowBillCosts(false);
            }}
          >
            <span>Dữ liệu CPQC</span>
          </div>
          <div
            className={`${showBillCosts ? 'bg-[#68c2ed]' : 'text-black'} rounded-md cursor-pointer h-full px-4 flex items-center justify-center hover:opacity-80 duration-300`}
            onClick={() => {
              setShowAdCosts(false);
              setShowBillCosts(true);
            }}
          >
            <span>Dữ liệu hóa đơn</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="large" className="bg-white border-[1px] border-[#007bb5] rounded-lg" onClick={() => exportToExcel(dataExportExcel)}>
            Export dữ liệu
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Header;