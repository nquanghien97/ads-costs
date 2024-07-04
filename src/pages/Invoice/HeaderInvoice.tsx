import Select from "react-select";
import BaseInput from "../../components/common/BaseInput";
import SearchIcon from "../../assets/icons/SearchIcon";
import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import BaseButton from "../../components/common/BaseButton";

type OptionType = {
  value: string;
  label: string;
} | null

type DateType = {
  startDate: string | null | Date;
  endDate: string | null | Date;
} | null

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

function HeaderInvoice() {
  const handleChange = (option: OptionType) => {
    console.log(option)
  }
  const [value, setValue] = useState<DateType>({ 
    startDate: new Date(), 
    endDate: new Date()
    }); 
    
    const handleValueChange = (newValue: DateType) => {
    console.log("newValue:", newValue); 
    setValue(newValue); 
    } 
  return (
    <div>
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
        <div className="w-[280px] outline-0 border rounded-full border-black z-[51]">
          <Datepicker 
            value={value} 
            onChange={handleValueChange} 
            inputClassName="bg-transparent text relative transition-all duration-300 py-2.5 pl-4 pr-14 w-full rounded-full tracking-wide font-light text-sm placeholder-gray-400 bg-white disabled:opacity-40 disabled:cursor-not-allowed ring-blue-500/20"
          />
        </div>
      </div>
      <div className="flex py-2 justify-between">
        <BaseButton color="info" className="text-white">Khai báo CPQC - Hóa đơn</BaseButton>
        <div className="flex gap-2">
          <BaseButton className="bg-white">Export dữ liệu</BaseButton>
        </div>
      </div>
    </div>
  )
}

export default HeaderInvoice;