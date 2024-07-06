import BaseInput from "../../components/common/BaseInput";
import SearchIcon from "../../assets/icons/SearchIcon";
import { useState } from "react";
import BaseButton from "../../components/common/BaseButton";
import PlusIcon from "../../assets/icons/PlusIcon";
import AddNewAdsAccount from "./AddNewAdsAccount";
import { DatePicker, Select } from "antd";

type OptionType = {
  value: string;
  label: string;
} | null

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

function Header() {

  const { RangePicker } = DatePicker;

  const [openAddNewAdsAccount, setOpenAddNewAdsAccount] = useState(false)
  const handleChange = (option: OptionType) => {
    console.log(option)
  }

  return (
    <>
      <div className="flex py-2 justify-between">
        <div className="flex gap-2 items-center">
          <div className="w-[160px]">
            <BaseInput placeholder="Tìm kiếm" className="text-red-100" fullWidth />
          </div>
          <Select
            options={options}
            onChange={handleChange}
            className="z-50 h-full w-[160px]"
            placeholder="Hệ thống"
          />
          <Select
            options={options}
            onChange={handleChange}
            className="z-50 h-full w-[160px]"
            placeholder="HKD"
          />
          <Select
            options={options}
            onChange={handleChange}
            className="z-50 h-full w-[160px]"
            placeholder="Họ tên"
          />
          <div className="flex items-center justify-center rounded-full bg-[#0071ba] w-8 h-8 cursor-pointer hover:bg-[#326de4] duration-300">
            <SearchIcon color="white" />
          </div>
        </div>
        <div className="w-[240px] outline-0 border rounded-full border-black">
          <RangePicker 
            className="bg-transparent text relative transition-all duration-300 py-2.5 pl-4 pr-14 w-full rounded-full tracking-wide font-light text-sm placeholder-gray-400 bg-white disabled:opacity-40 disabled:cursor-not-allowed ring-blue-500/20"
          />
        </div>
      </div>
      <div className="flex justify-between my-4">
        <div className="m-auto">
          <span className="px-6 py-2 rounded-full bg-[#0071BA] text-white uppercase">Khai báo tài khoản quảng cáo</span>
        </div>
        <BaseButton color="info" className="text-white" onClick={() => setOpenAddNewAdsAccount(true)}>
          Thêm mới
          <PlusIcon color="white" />
        </BaseButton>
      </div>
      {openAddNewAdsAccount && <AddNewAdsAccount onClose={() => setOpenAddNewAdsAccount(false)} />}
    </>
  )
}

export default Header;