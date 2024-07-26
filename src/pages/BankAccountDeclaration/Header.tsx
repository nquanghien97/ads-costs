import SearchIcon from "../../assets/icons/SearchIcon";
import { useState } from "react";
import { Button, Form, Input, Select, Tooltip } from "antd";
import { useGroupsStore } from "../../zustand/groups.store";
import { useSystemsStore } from "../../zustand/systems.store";
import User from "../../entities/User";
import { BankAccountType } from "../../entities/BankAccount";
import { getUsers } from "../../services/users";
import { FormSearchValueType } from ".";
import { getListBankAccounts } from "../../services/bank_account";

interface HeaderProps {
  setData: React.Dispatch<React.SetStateAction<BankAccountType[]>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  setFormSearchValue: React.Dispatch<React.SetStateAction<FormSearchValueType | undefined>>
}

interface FormValues {
  key_word: string;
  system_id: number;
  group_id: number;
  search_name: {
    label: string;
    value: number;
  };
}

function Header(props: HeaderProps) {
  const { setData, setLoading, setFormSearchValue } = props;
  
  const { groups } = useGroupsStore();
  const { systems } = useSystemsStore();
  const [selectedSystem, setSelectedSystem] = useState(-1);
  const [name, setName] = useState<User[]>([]);

  const [form] = Form.useForm();

  const handleSystemChange = (option: number) => {
    setSelectedSystem(option)
    form.setFieldsValue({ group_id: null });
    form.setFieldsValue({ name: null });
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
      search: data.key_word,
      group_id: data.group_id,
      system_id: data.system_id,
      user_id: data.search_name?.value
    }
    try {
      const res = await getListBankAccounts(submitData)
      setData(res.data.data.list)
      setFormSearchValue((pre) => ({
        ...pre,
        ...submitData
      }))
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Form onFinish={onFinish} className="flex py-2 justify-between" form={form}>
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
      </Form>
    </>
  )
}

export default Header;