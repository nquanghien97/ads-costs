import { useState } from "react";
import PlusIcon from "../../assets/icons/PlusIcon"
import AddNewInformation from "./AddNewInformation";

interface InformationSettingProps {
  data: {id: number, name: string}[];
  title: string;
}

function InformationSetting(props: InformationSettingProps) {
  const { data, title } = props;
  const [openModalAddInformation, setOpenModalAddInformation] = useState(false);
  return (
    <div className="flex items-center border border-sky-500 p-2 rounded-xl">
      <div className="mr-4 px-6 py-2 rounded-full bg-[#0071BA] text-white uppercase text-center w-[200px]">
        <span>{title}</span>
      </div>
      <ul className="flex flex-wrap">
        {data.map((item) => (
          <li key={item.id} className="mr-4 px-6 py-2 rounded-full bg-[#29A9E0] text-white uppercase text-center">
            {item.name}
          </li>
        ))}
      </ul>
      <div className="!bg-[#29A9E0] p-1 rounded-lg cursor-pointer" onClick={() => setOpenModalAddInformation(true)}>
        <PlusIcon />
      </div>
      {openModalAddInformation && <AddNewInformation title={title} onClose={() => setOpenModalAddInformation(false)} />}
    </div>
  )
}

export default InformationSetting