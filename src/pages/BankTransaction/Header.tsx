import { useState } from "react";
import SearchIcon from "../../assets/icons/SearchIcon";
import { Button, DatePicker, Form, Input, Select, Tooltip } from "antd";
import User, { UserRole } from "../../entities/User";
import { useGroupsStore } from "../../zustand/groups.store";
import { useSystemsStore } from "../../zustand/systems.store";
import { getUsers } from "../../services/users";
import localeValues from "antd/locale/vi_VN";
import TransferMoney from "./Declaration/transfer-money";
import CostsDeclaration from "./Declaration/costs";
import ExchangeRate from "./Declaration/exchange_rate";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/date";
import { SearchFormValues } from ".";
import { exportExcelBankTransaction } from "../../components/ExportExcel/ExportExcelBankTransaction";
import { BankTransactionsDTO } from "../../dto/BankTransactionsDTO";
import { useAuthStore } from "../../zustand/auth.store";

interface FormValues {
  search: string;
  system_id: number;
  group_id: number;
  user: {
    label: string;
    value: number;
  };
  date: Date[]
}

interface HeaderProps {
  setSearchForm: React.Dispatch<React.SetStateAction<SearchFormValues>>
  setRefreshKey: React.Dispatch<React.SetStateAction<boolean>>
  dataBankBillings: BankTransactionsDTO[]
}

function Header(props: HeaderProps) {
  const { setSearchForm, setRefreshKey, dataBankBillings } = props;

  const { RangePicker } = DatePicker
  const { groups } = useGroupsStore();
  const { systems } = useSystemsStore();
  const { user } = useAuthStore();
  const [selectedSystem, setSelectedSystem] = useState(-1);
  const [name, setName] = useState<User[]>([]);
  
  const [openModalTransfer, setOpenModalTransfer] = useState(false);
  const [openModalCosts, setOpenModalCosts] = useState(false);
  const [openModalExchangeRate, setOpenModalExchangeRate] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);

  const [form] = Form.useForm();

  const handleSystemChange = (option: number) => {
    setSelectedSystem(option)
    form.setFieldsValue({ group_id: null });
    form.setFieldsValue({ user: null });
  };

  const handleGroupChange = async (value: number) => {
    setLoadingUser(true);
    form.setFieldsValue({ user: null })
    try {
      const res = await getUsers({group_id: value});
      setName(res.data.data.list)
    } catch(e){
      console.log(e);
    } finally {
      setLoadingUser(false);
    }
  }

  const onFinish = (data: FormValues) => {
    const submitData = {
      search: data.search,
      since: data.date ? formatDate(new Date(data.date?.[0])): undefined,
      until: data.date ? formatDate(new Date(data.date?.[1])) : undefined,
      system_id: data.system_id,
      group_id: data.group_id,
      user_id: data.user?.value
    }
    try {
      setSearchForm(submitData)
      setRefreshKey(pre => !pre)
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <>
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
              allowClear
              notFoundContent="Không có hệ thống"
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
            />
          </Form.Item>
          <Form.Item
            className="w-[160px]"
            name="user"
          >
            <Select
              options={name.map(item => ({label: item.name, value: item.id}))}
              className="z-50 h-full w-[160px]"
              placeholder="Họ tên"
              notFoundContent="Không có nhân sự"
              allowClear
              loading={loadingUser}
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
          {(user.role === UserRole.ACCOUNTANT || user.role === UserRole.ROOT) ? (
            <>
              <div className="bg-[#0071ba] rounded-md cursor-pointer h-full px-4 flex items-center justify-center hover:opacity-80 duration-300" onClick={() => setOpenModalTransfer(true)}>
                <span className="text-white">Khai báo tiền chuyển</span>
              </div>
              <div className="bg-[#0071ba] rounded-md cursor-pointer h-full px-4 flex items-center justify-center hover:opacity-80 duration-300" onClick={() => setOpenModalCosts(true)}>
                <span className="text-white">Khai báo Chi phí</span>
              </div>
              <div className="bg-[#0071ba] rounded-md cursor-pointer h-full px-4 flex items-center justify-center hover:opacity-80 duration-300" onClick={() => setOpenModalExchangeRate(true)}>
                <span className="text-white">Khai báo tỷ giá ngân hàng</span>
              </div>
              {openModalTransfer && <TransferMoney openModalTransfer={openModalTransfer} setOpenModalTransfer={setOpenModalTransfer} />}
              {openModalCosts && <CostsDeclaration openModalCosts={openModalCosts} setOpenModalCosts={setOpenModalCosts} />}
              {openModalExchangeRate && <ExchangeRate openModalExchangeRate={openModalExchangeRate} setOpenModalExchangeRate={setOpenModalExchangeRate} />}
            </>
          ) : null}
        </div>
        <div className="flex gap-2">
          <Button size="large">
            <Link to="/xem-ty-gia">
              <span className="font-normal">Xem tỷ giá</span>
            </Link>
          </Button>
          <Button size="large" onClick={() => exportExcelBankTransaction(dataBankBillings)}>
            <span>Export dữ liệu</span>
          </Button>
        </div>
      </div>
    </>
  )
}

export default Header;