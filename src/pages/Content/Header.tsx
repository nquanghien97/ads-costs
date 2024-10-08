import SearchIcon from "../../assets/icons/SearchIcon";
import { useState } from "react";
import { Button, Form, Input, Select, Tooltip } from "antd";
import { useGroupsStore } from "../../zustand/groups.store";
import { useSystemsStore } from "../../zustand/systems.store";
import { getUsers } from "../../services/users";
import User from "../../entities/User";
import { SearchFormType } from ".";

interface FormValues {
  search: string;
  system_id_search: number;
  group_id_search: number;
  search_name: {
    label: string;
    value: number;
  };
}

function Header(
  { setLoading, setSearchForm }
  :
  { setLoading: React.Dispatch<React.SetStateAction<boolean>>, setSearchForm: React.Dispatch<React.SetStateAction<SearchFormType>>}
) {
  const { groups } = useGroupsStore();
  const { systems } = useSystemsStore();
  const [selectedSystem, setSelectedSystem] = useState(-1);
  const [name, setName] = useState<User[]>([]);
  const [loadingUser, setLoadingUser] = useState(false);

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
    const dataSubmit = {
      search: data.search,
      group_id: data.group_id_search,
      system_id: data.system_id_search,
      name: data.search_name?.label
    }
    try {
      setSearchForm(dataSubmit)
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <Form
        onFinish={onFinish}
        className="flex py-2 justify-between"
        form={form}
      >
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
            name="system_id_search"
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
            name="group_id_search"
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
            name="search_name"
          >
            <Select
              labelInValue
              options={name.map(item => ({label: item.name, value: item.id}))}
              className="z-50 h-full w-[160px]"
              placeholder="Họ tên"
              notFoundContent="Không có nhân sự"
              loading={loadingUser}
              allowClear
              rootClassName="border-[1px] border-[#007bb5] rounded-lg"
            />
          </Form.Item>
          <Form.Item
            className="w-[180px]"
            name="status"
          >
            <Select
              options={[{ label: "Đã duyệt", value: "Đã duyệt " }, { label: "Chờ duyệt", value: "Chờ duyệt " }, { label: "Từ chối", value: "Từ chối " }]}
              className="z-50 h-full w-[160px]"
              placeholder="Trạng thái kiểm duyệt"
              notFoundContent="Loading..."
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
      </Form>
    </>
  )
}

export default Header;
